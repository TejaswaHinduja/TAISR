const express = require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

dotenv.config();
console.log("MONGO_URL is:", process.env.MONGO_URL);
console.log('TWITTER_CLIENT_ID:', process.env.TWITTER_CLIENT_ID);
console.log('TWITTER_CLIENT_SECRET:', process.env.TWITTER_CLIENT_SECRET);
const app=express();
mongoose.connect(process.env.MONGO_URL+'taisr').then(()=>console.log("Connected to MongoDB")).catch((err)=>console.log("Connection Fail",err));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
}));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: true,           // Changed to true
    saveUninitialized: false, // Changed to false
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URL,
        ttl: 24 * 60 * 60, // 1 day
        autoRemove: 'native'
    }),
    cookie: { 
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    },
    proxy: true
}));
const authRoutes=require('./routes/authRoutes');
const tweetRoutes=require('./routes/tweetRoutes');


app.use('/api/auth',authRoutes);
app.use('/api/tweets',tweetRoutes);

app.get('/',(req,res)=>{
    res.send("TAISR API is running")
});

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})