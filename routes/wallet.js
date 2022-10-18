const express = require('express');
const router = express.Router();
const lightwallet = require("eth-lightwallet");
const fs = require('fs');
const MinaSDK = require("@o1labs/client-sdk");
const snarky = require('snarkyjs');
const { PublicKey, PrivateKey } = require('snarkyjs');
const axios = require('axios');


/*
* Devnet GraphQL URL
*/
const graphql_url = "https://mina-devnet-graphql.aurowallet.com/graphql";


/*
* 공개키, 비밀키 발급
*/
router.post("/register", async (req, res) => {
  /*
  * MinaSDK.genKeys();
  * => 개인키, 공개키 생성
  * return : publickey
  */
  let keys = MinaSDK.genKeys();
  console.log("Register : Making keys pair "+keys);
  //console.log("Mina Test 1 : "+keys);
  //console.log("Mina Test 1-1 : "+keys.privateKey);
  //console.log("Mina Test 1-2 : "+keys.publicKey);
  
  /*
  * MinaSDK.signMessage();
  * => 개인키&공개키를 넣고, 특정 단어(니모닉)에 서명을 하면, 서명값과 원본데이터(페이로드)가 리턴 
  * param : privateKey & publickey
  * return : publickey, signature, payload
  */
  const mnemonic = lightwallet.keystore.generateRandomSeed();
  console.log("Register : Making Mnemonic Word "+mnemonic);

  let signed = MinaSDK.signMessage(mnemonic, keys);
  console.log("Register sigend : "+signed);
  // console.log("Mina Test 2-1 : "+signed.publicKey);
  // console.log("Mina Test 2-2 : "+signed.signature);
  // console.log("Mina Test 2-3 : "+signed.payload);
  
  /*
  * MinaSDK.verifyMessage();
  * => 서명의 변경 유무 체크
  * @param key - The keypair used to sign the transaction
  * @returns Boolean (A signed payment transaction)
  */
  if (MinaSDK.verifyMessage(signed)) {
    console.log("Message was verified successfully");
  }

  

  let signedPayment = MinaSDK.signPayment(
    {
      to: keys.publicKey,
      from: keys.publicKey,
      amount: 1,
      fee: 1,
      nonce: 0,
    },
    keys
  );

  })
  ;
  

  /*
  * 계좌 잔액 조회용 쿼리 
  * param : publickey
  * return : total(balance), nonce value 
  */
  const getAccountInfoQuery = (publicKey) => {
    return `{account(publicKey: \"${publicKey}\") {
          balance {
            total
          }
          delegate
          nonce
      }}`;
  };
  
  /*
  * 계좌 잔액 조회 api 
  */
  router.get("/balance", async (req, res) => {
      
      //발급받은 공개키 셋팅
      const _publicKey = 'B62qiU6qMUnKzkLC2RxSs2gxvusLhfMrpqfgnwvUxE7woBKfSHJu79U';
      let resultInfo = {};
  
      axios
        .get(graphql_url, {
          params: {
            query: `${getAccountInfoQuery(_publicKey)}`
          }
        })
        .then((result) => {
          const _data = result.data.data;_publicKey
          const _account = _data.account;
          
          resultInfo.balance = _account.balance.total;
          resultInfo.delegate = _account.delegate;
          resultInfo.nonce = _account.nonce;

          console.log(`balance total: ${_account.balance.total}`);
          console.log(`delegate: ${_account.delegate}`);
          console.log(`nonce: ${_account.nonce}`);
          
          //조회된 잔액을 리턴
          res.json({ message: "ok", data: resultInfo });
        })
        .catch((err) => {
          console.log(err);
        })
  });


  /*
  * 송금을 위한 쿼리 
  * param : fee, amount, to_publicKey, from_publicKey, memo, nonce, validUtil, field, scalar
  * return : hash value
  */
  const getSendPaymentQuery = (fee, amount, to_publicKey, from_publicKey, memo, nonce, validUtil, field, scalar) => {
    return `mutation {sendPayment(
        input: {
          fee: \"${fee}\",
          amount: \"${amount}\",
          to: \"${to_publicKey}\",
          from: \"${from_publicKey}\",
          memo: \"${memo}\",
          nonce: \"${nonce}\",
          validUntil: \"${validUtil}\"
        },
        signature: {
          field: \"${field}\", 
          scalar: \"${scalar}\"
        }) {
        payment {
          hash,
          id
        }
      }
    }`;
  };
  
  /*
  * 송금 api 
  */
  router.post("/send", async (req, res) => {

    console.log(" !!! START _preTransaction signedPayment method !!!")
    
    //보내는 사람의 pubkey와 받는 사람의 pubkey 설정
    const _to = 'B62qiU6qMUnKzkLC2RxSs2gxvusLhfMrpqfgnwvUxE7woBKfSHJu79U';
    //console.log(" !!! Test 01 !!!" + _to);
    const _from = 'B62qmxbgnBUH8GQc5deTywqv7NYsXvLsADjTr2cKDdmtHxEMJBi32vS';
    //console.log(" !!! Test 02 !!!" + _from);
    //보내는 사람의 Private key 셋팅 
    const _pkKey = 'EKE25kcSt1Jg8xkcQy6ZYSnzbNi3MZ39PGgD2k4D9ZdfgkF7KB4V';
    //console.log(" !!! Test 03 !!!" + _pkKey);
    const keys = {privateKey: _pkKey, publicKey: _from}
    
    //논스값은 중복 검증을 위한 값으로 가장 최근의 논스값을 가져오기 위해 '0'으로 셋팅
    let _nonce = 0;

    // get nonce to use.
    await axios.get(graphql_url, {
          params: {
            query: `${getAccountInfoQuery(_from)}`
          }
        })
        .then((result) => {
          const _data = result.data.data;
          const _account = _data.account;
          _nonce = _account.nonce;
          console.log(`nonce: ${_nonce}`);
        })
        .catch((err) => {
          console.log(err);
        })

    console.log(" !!! Find Nonce Value !!!");
    

    //송금을 위한 정보 셋팅
    try{
      const _amount = 1000000000;
      const _fee = 10000000;
      const _memo = "send mina test";
      //송금 실행
      const signedPayment = MinaSDK.signPayment(
        {
          to: _to,
          from: _from,
          amount: _amount,
          fee: _fee,
          nonce: _nonce,
          memo: _memo
        },
        keys
      );
      

      //송금 실행 정보 브로드캐스팅 쿼리 
      const sendPaymentQuery = getSendPaymentQuery(_fee, _amount, _to, _from, _memo, _nonce,
        signedPayment.payload.validUntil, signedPayment.signature.field, signedPayment.signature.scalar);
      await axios.get(graphql_url, {
        params: {
          query: `${sendPaymentQuery}`
        }
      })
      .then((result) => {
        console.log(result);
        res.send(`hash: ${result.data.data.sendPayment.payment.hash}
        id: ${result.data.data.sendPayment.payment.id}`);
      })
      .catch((err) => {
        console.log("broadcasting error : " + err);
      })

    }catch(exception){
      console.log("@@@@@ FAIL @@@@@" +exception);
    }

    console.log(" !!! End Sending!!!");

  });

module.exports = router;