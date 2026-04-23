import express from 'express';
import cors from 'cors';

import morgan from 'morgan';
// import adminRouter from './routes/adminRoutes.js';
// import webRouter from './routes/webRoutes.js';
// import mobileRouter from './routes/mobileRoutes.js';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));

// ----- Test Route -----
app.get('/api/test', (req, res) => {
    res.send('Hello, I am Backend and I am live Now');
})


// All routes
// app.use('/api/admin', adminRouter)
// app.use('/api/web', webRouter)
// app.use('/api/mobile', mobileRouter)



export default app;