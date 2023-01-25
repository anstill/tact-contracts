import { config } from 'dotenv'
import { get } from 'env-var';
import fs from 'fs';
import { parse, stringify } from 'envfile';

config();

const env = {
  deployer: {
    mnemonic: get('DEPLOYER_MNEMONIC').required().asArray(' '),
  },
  toncenter: {
    endpoint: get('TONCENTER_ENDPOINT').default('https://testnet.toncenter.com/api/v2/jsonRPC').asUrlString(),
    apiKey: get('TONCENTER_API_KEY').required().asString(),
  },
  deployed:{
    get contractAddress() {
      return get('DEPLOYED_CONTRACT_ADDRESS').required().asString();
    },
    set contractAddress(address: string) {
      let parsedFile = parse(fs.readFileSync('.env').toString()); 

      parsedFile.DEPLOYED_CONTRACT_ADDRESS = address;

      fs.writeFileSync('./.env', stringify(parsedFile));
      
      config();
    }
  }
}



export default env;