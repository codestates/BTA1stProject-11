# BTA1stProject-11

๐ง๐ปโโ๏ธ[About Team]
===========================
  * Team Name : ๋๋ ์ 
  * Project Name : ๋ ์ํผ 
  * Member : ์์งํ, ์ค์ข์น

๐ง๐ปโโ๏ธ[About Project]
===========================
  * Mainnet : Mina Protocol
  * Feature : Layer2, zkSnark

๐ [process]
============
  * 1๏ธโฃ Register : ๊ณต๊ฐํค, ๋น๋ฐํค ๋ฐ๊ธ 
    * CodaSDK ์ฌ์ฉ 
  * 2๏ธโฃ signPayemtn : ์ก๊ธ 
    * client-sdk method
  * 3๏ธโฃ broadcating : ์ก๊ธ ์ฌ์ค ์๋ฆผ (๋ธ๋ก์์ฑ)
    * GraphQl query 

๐จ๐ปโ๐ป[Installed Npm Module]
=======================
  * npm install --save @o1labs/client-sdk (MINA library)
  * npm install express-routes (express route)
  * npm install snarkyjs (zk rpc ์ง์?)
  * npm install node-fetch (์๋  ๊ฒฝ์ฐ node-fetch ์ ๊ฑฐ ํ npm install node-fetch@2)
  * npm install axios


๐งท[About MINA Domain]
====================
  * https://devnet.minaexplorer.com/faucet (Devnet Faucet)
  * https://faucet.minaprotocol.com/ (Devnet Faucet)
  * https://devnet.minaexplorer.com/ (scan block)
  * https://docs.aurowallet.com/general/ (Auro Wallet Docs)
  * https://github.com/MinaProtocol/mina/blob/develop/frontend/client_sdk/src/MinaSDK.d.ts (Mina SDK github)
  * https://www.coinbase.com/cloud/discover/protocol-guides/guide-to-mina (Mina protocol)

๐จ[Setting Mina Devnet node]
============================
  * โ๏ธ ๊ฐ๋ฐํ๊ฒฝ์ Docker๊ฐ ์ค์น๋์ด์๊ณ , VS code extension 'docker'๊ฐ ์ค์น๋์ด ์์ด์ผํจ. 
    * 0๏ธโฃ key-pair 
      * docker pull --platform linux/amd64 minaprotocol/generate-keypair:latest
    
  
    * 1๏ธโฃ ๋์ปค ์ด๋ฏธ์ง๋ฅผ ํตํ ๋ฐฉ๋ฒ (๋งฅ m1 ์ arm64์ด๊ธฐ ๋๋ฌธ์ platform ์ง์ )
      * ์ด๋ฏธ์ง Pull : docker pull --platform linux/amd64 minaprotocol/mina-daemon:1.3.2alpha1-ccaa43c-stretch-devnet
      * ์ด๋ฏธ์ง run : docker run --platform linux/amd64 --name mina-demo -e RUN_DEMO=true minaprotocol/mina-daemon:1.3.2alpha1-ccaa43c-stretch-devnet 

๐ฑ [trouble shooting]
====================
  * โ๏ธ client-sdk ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ก @o1labs/client-sdk ์ ์ฌ์ฉํ๋๋ฐ Devnet๊ณผ Mainnet์ ๋ฒ์ ์ด ๋ฌ๋ผ์ ์ก๊ธ ํ ์๋ชํ ๋ ๊ฐ์ด ํ๋ฆฌ๋ ์ค๋ฅ๊ฐ ๋ฐ์. 
      * ํ์คํธ๋ท version์ '0.2.5' (1.0.0 ์ด์ ๋ฒ์ ์ด ๋ฉ์ธ๋ท)
  * โ๏ธ ์ก๊ธ ํ ๋ธ๋ก๋์บ์คํ์ ํด์ผํ๋๋ฐ rest api ๋ฐฉ์์ ๋๋ฉ์ธ์ด ๋ฉ์ธ๋ท๊ณผ ์กฐ๊ธ ๋ค๋ฆ 
      * https://devnet.minaexplorer.com/broadcast-tx
  * โ๏ธ rest api ๋ฐฉ์๋ณด๋จ GraphQL์ ์ฌ์ฉํ๋๊ฒ ๊ฐ์ฅ ์ ํํ ๋ฐฉ๋ฒ (22.6์ ์ดํ GraphQL๋ก ์ ํํ๋ฏ)
    * ๐๐ปโโ๏ธ ๊ณต์ docs๊ฐ ์ต์ ํ๊ฐ ๋์ง ์์ ๋ถ๋ถ๋ค์ด ์์ด์, ๋๋ถ๋ถ ๋ฏธ๋ํ๋กํ ์ฝ ๋์ค์ฝ๋ ์๋ฒ ํ์คํ ๋ฆฌ์์ ์ด์๋ฅผ ํด๊ฒฐํจ. 