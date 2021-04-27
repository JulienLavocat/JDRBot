import { config } from "dotenv";
import { connect } from "./bot";
config();

async function bootstrap() {
    await connect();
    console.log("Connected to Discord");
}

bootstrap();