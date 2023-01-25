import { TonClient } from "ton";
import env from "../var/env"


const client = new TonClient(env.toncenter);

export default client;