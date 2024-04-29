const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require("./src/config/db");
const userRouter =  require('./src/routes/user')
const eventRouter = require('./src/routes/event')
const bookingRouter = require('./src/routes/booking')
const adminRouter = require('./src/routes/admin')
const cookieParser = require("cookie-parser");
// Load config
dotenv.config({ path: './src/config/config.env'})
const app = express()

const port = process.env.PORT || 3000
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))  
}  
//cors 
app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    })
  );
app.use(cookieParser());
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api/v1/users', userRouter)  
app.use('/api/v1/events', eventRouter)
app.use('/api/v1/bookings', bookingRouter)
app.use('/api/v1/admin', adminRouter)
// Connect to database
connectDB(); 


app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))
