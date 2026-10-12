import app from './app/app.js';
import { connectDb } from './config/db.js';

await connectDb();

app.listen(3000, (req, res)=> {
    console.log("Server is runnnig on port 3000");
})