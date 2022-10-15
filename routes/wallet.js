const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const lightwallet = require("eth-lightwallet");
const fs = require('fs');
const MinaSDK = require("@o1labs/client-sdk");
const snarky = require('snarkyjs');
const { PublicKey } = require('snarkyjs');
const fetch = require('node-fetch');
const axios = require('axios');

/*
* DB : mysql
*/
/*
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234', 
    database : 'user_table' 
})

connection.connect();
*/

router.post("/test", async (req, res) => {
    console.log(snarky);
    const url = "https://mina-devnet-graphql.aurowallet.com/graphql";
    snarky.setGraphqlEndpoint(url);

    const _address = await snarky.fetchAccount(PublicKey.fromBase58('B62qiU6qMUnKzkLC2RxSs2gxvusLhfMrpqfgnwvUxE7woBKfSHJu79U'));
        
    console.log("@#@#@#@ " + _address);
    console.log(snarky.Mina.BerkeleyQANet("url").hasAccount(PublicKey.fromBase58('B62qiU6qMUnKzkLC2RxSs2gxvusLhfMrpqfgnwvUxE7woBKfSHJu79U')));
    console.log(snarky.Mina.BerkeleyQANet("url").hasAccount(PublicKey.fromBase58('B62qmxbgnBUH8GQc5deTywqv7NYsXvLsADjTr2cKDdmtHxEMJBi32vS')));
    console.log(snarky.Mina.hasAccount(PublicKey.fromBase58('B62qiU6qMUnKzkLC2RxSs2gxvusLhfMrpqfgnwvUxE7woBKfSHJu79U')));
    console.log(snarky.Mina.hasAccount(PublicKey.fromBase58('B62qmxbgnBUH8GQc5deTywqv7NYsXvLsADjTr2cKDdmtHxEMJBi32vS')));
});


router.post("/register", async (req, res) => {
  /*
  * MinaSDK.genKeys();
  * => 개인키로 공개키를 생성
  * param : privateKey
  * return : publickey
  */
  let keys = MinaSDK.genKeys();
  console.log("Mina Test 1 : "+keys);
  // Mina Test 1 : [object Object]
  console.log("Mina Test 1-1 : "+keys.privateKey);
  // Mina Test 1-1 : EKEtivMqPreVkMR6cyhM1HcbQUkyrL3Eayya6ub82BG7UhLDSRgQ
  console.log("Mina Test 1-2 : "+keys.publicKey);
  // Mina Test 1-2 : B62qimuvZxZxzXX7iAakYVAGqGptds41jAeESHR8sTDtAVcEnKybFX2
  /*
  * MinaSDK.signMessage();
  * => 개인키&공개키를 넣고, 특정 단어(원본 데이터)에 서명을 하면, 서명값과 원본데이터(페이로드)가 리턴 
  * param : privateKey & publickey
  * return : publickey, signature, payload
  */
  const mnemonic = lightwallet.keystore.generateRandomSeed();
  console.log("Mina Test 3 : " + mnemonic);

  let signed = MinaSDK.signMessage(mnemonic, keys);
  console.log("Mina Test 2 : "+signed);
  // Mina Test 2 : [object Object]
  console.log("Mina Test 2-1 : "+signed.publicKey);
  // Mina Test 2-1 : B62qimuvZxZxzXX7iAakYVAGqGptds41jAeESHR8sTDtAVcEnKybFX2
  console.log("Mina Test 2-2 : "+signed.signature);
  // Mina Test 2-2 : [object Object]
  console.log("Mina Test 2-3 : "+signed.payload);
  // Mina Test 2-3 : world
  /*
  * MinaSDK.verifyMessage();
  * => 서명의 변경 유무 체크?  
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
  
  const getAccountInfoQuery = (publicKey) => {
    return `{account(publicKey: \"${publicKey}\") {
          balance {
            total
          }
          delegate
          nonce
      }}`;
  };
  
  router.get("/balance", async (req, res) => {
      console.log(snarky);
      const url = "https://mina-devnet-graphql.aurowallet.com/graphql";
      const _publicKey = 'B62qiU6qMUnKzkLC2RxSs2gxvusLhfMrpqfgnwvUxE7woBKfSHJu79U';
      let resultInfo = {};
  
      axios
        .get(url, {
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

          res.json({ message: "ok", data: resultInfo });
        })
        .catch((err) => {
          console.log(err);
        })
  });

module.exports = router;