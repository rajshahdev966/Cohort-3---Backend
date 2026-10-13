import { connectDb } from "../../../access_refresh_tokens/src/config/db.js";
import app from "./app/app.js";
import config from "./config/config.js";

await connectDb();

app.listen(3000, (res, req)=> {
    console.log("Port is successfully running on port", config.PORT)
})

