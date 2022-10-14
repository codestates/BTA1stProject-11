# BTA1stProject-11

🧍🏻‍♂️[About Team]
===========================
  * Team Name : 또띠아 
  * Project Name : 레시피 
  * Member : 석지환, 윤종승

👨🏻‍💻[Installed Npm Module]
=======================
  * npm install --save @o1labs/client-sdk (MINA library)
  * npm install express-routes (express route)
  * npm install snarkyjs (zk rpc 지원?)
  * npm install node-fetch


🧷[About MINA Domain]
====================
  * https://devnet.minaexplorer.com/faucet (Devnet Faucet)
  * https://faucet.minaprotocol.com/ (Devnet Faucet)
  * https://devnet.minaexplorer.com/ (scan block)
  * https://docs.aurowallet.com/general/ (Auro Wallet Docs)
  * https://github.com/MinaProtocol/mina/blob/develop/frontend/client_sdk/src/MinaSDK.d.ts (Mina SDK github)
  * 

🔨[Setting Mina Devnet node]
============================
  ❗️ 개발환경에 Docker가 설치되어있고, VS code extension 'docker'가 설치되어 있어야함. 
  0️⃣ key-pair 
    * docker pull --platform linux/amd64 minaprotocol/generate-keypair:latest
    * 
  
  1️⃣ 도커 이미지를 통한 방법 (맥 m1 은 arm64이기 때문에 platform 지정)
    * 이미지 Pull : docker pull --platform linux/amd64 minaprotocol/mina-daemon:1.3.2alpha1-ccaa43c-stretch-devnet
    * 이미지 run : docker run --platform linux/amd64 --name mina-demo -e RUN_DEMO=true minaprotocol/mina-daemon:1.3.2alpha1-ccaa43c-stretch-devnet 

