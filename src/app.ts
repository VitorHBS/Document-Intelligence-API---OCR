import express from "express"

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'API is running'
    })
})

export default app