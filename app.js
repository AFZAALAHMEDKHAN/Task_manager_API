const express = require('express')
const app = express();
const task = require('./routes/task')
const connectDB = require('./db/connect')
const notFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error_handler')
require('dotenv').config()

app.use(express.json())
app.use(express.static('./public'))


app.use('/api/v1/tasks',task)
app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000
const start = async () => {
  try {
    console.log("Attempting to connect to database...");
    await connectDB(process.env.MONGO_URI);
    console.log("Database connection successful.");
    
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start app:", error);
  }
};



start()


