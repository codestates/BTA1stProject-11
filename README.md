# BTA1stProject-11

🧍🏻‍♂️[About Team]
===========================
  * Team Name : 또띠아 
  * Project Name : 레시피 
  * Member : 석지환, 윤종승

🧍🏻‍♂️[About Project]
===========================
  * Mainnet : Mina Protocol
  * Feature : Layer2, zkSnark

🌕 [process]
============
  * 1️⃣ Register : 공개키, 비밀키 발급 
    * CodaSDK 사용 
  * 2️⃣ signPayemtn : 송금 
    * client-sdk method
  * 3️⃣ broadcating : 송금 사실 알림 (블록생성)
    * GraphQl query 

👨🏻‍💻[Installed Npm Module]
=======================
  * npm install --save @o1labs/client-sdk (MINA library)
  * npm install express-routes (express route)
  * npm install snarkyjs (zk rpc 지원?)
  * npm install node-fetch (안될 경우 node-fetch 제거 후 npm install node-fetch@2)
  * npm install axios


🧷[About MINA Domain]
====================
  * https://devnet.minaexplorer.com/faucet (Devnet Faucet)
  * https://faucet.minaprotocol.com/ (Devnet Faucet)
  * https://devnet.minaexplorer.com/ (scan block)
  * https://docs.aurowallet.com/general/ (Auro Wallet Docs)
  * https://github.com/MinaProtocol/mina/blob/develop/frontend/client_sdk/src/MinaSDK.d.ts (Mina SDK github)
  * https://www.coinbase.com/cloud/discover/protocol-guides/guide-to-mina (Mina protocol)

🔨[Setting Mina Devnet node]
============================
  ❗️ 개발환경에 Docker가 설치되어있고, VS code extension 'docker'가 설치되어 있어야함. 
  0️⃣ key-pair 
    * docker pull --platform linux/amd64 minaprotocol/generate-keypair:latest
    * 
  
  1️⃣ 도커 이미지를 통한 방법 (맥 m1 은 arm64이기 때문에 platform 지정)
    * 이미지 Pull : docker pull --platform linux/amd64 minaprotocol/mina-daemon:1.3.2alpha1-ccaa43c-stretch-devnet
    * 이미지 run : docker run --platform linux/amd64 --name mina-demo -e RUN_DEMO=true minaprotocol/mina-daemon:1.3.2alpha1-ccaa43c-stretch-devnet 

😱 [trouble shooting]
====================
  ❗️ client-sdk 라이브러리로 @o1labs/client-sdk 을 사용했는데 Devnet과 Mainnet의 버전이 달라서 송금 후 서명할때 값이 틀리는 오류가 발생. 
      * 테스트넷 version은 '0.2.5' (1.0.0 이상 버전이 메인넷)
  ❗️ 송금 후 브로드캐스팅을 해야하는데 rest api 방식은 도메인이 메인넷과 조금 다름 
      * https://devnet.minaexplorer.com/broadcast-tx
  ❗️ rest api 방식보단 GraphQL을 사용하는게 가장 정확한 방법 (22.6월 이후 GraphQL로 전환한듯)
  🙆🏻‍♂️ 공식 docs가 최신화가 되지 않은 부분들이 있어서, 대부분 미나프로토콜 디스코드 서버 히스토리에서 이슈를 해결함. 