import express from "express"
import { uploadRouter } from "./modules/documents/documents.routers.js";
import { errorMiddleware } from "./shared/middlewares/error.middleware.js";
import routers from "./routers/index.js";

const app = express();

app.use(express.json());

app.use(uploadRouter);
app.use(routers)


app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'API is running'
    })
})

app.use(errorMiddleware);

export default app