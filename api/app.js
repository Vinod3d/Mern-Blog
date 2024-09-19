require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
var cors = require('cors')
const path = require( 'path' );

const _dirname = path.resolve();

// database
const connectDB = require('./db/connect');

//  routers
const userRouter = require( './routes/userRoutes' );
const authRouter = require( './routes/authRoutes' );
const postRouter = require( './routes/postRoutes' );
const commentRouter = require( './routes/commentRoutes' );

// middleware imported
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware use
app.use(express.json());
app.use(cors({
  origin: ['https://firebasestorage.googleapis.com/v0/b/', 'https://lh3.googleusercontent.com/a/'],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}))
app.use(cookieParser(process.env.JWT_SECRET));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comment', commentRouter);

app.use(express.static(path.join(_dirname + '/client/dist')));
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'client','dist','index.html'));
})


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL);
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
