// import http from "http";
var express =  require("express");
var logger = require("morgan");
var cors = require( "cors");
const bodyParser = require("body-parser");


//Socket IO
var socket = require('socket.io');


// routes
var indexRouter = require("./routes/index.js");
// var userRouter = require("./routes/user.js");
// var chatRoomRouter = require("./routes/chatRoom.js");
// var deleteRouter = require( "./routes/delete.js");
// middlewares
var { decode } = require('./middlewares/jwt.js')
require("./config/mongo.js");

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "4000"; 
app.set("port", port);

app.use(cors({ origin: true }));
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", indexRouter);
// app.use("/users", userRouter);
// app.use("/room", decode, chatRoomRouter);
// app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

/** Create HTTP server. */
// const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
var server = app.listen(port, function() {
  console.log(`Listening finally port:: http://localhost:${port}/`)
});
/** Event listener for HTTP server "listening" event. */
app.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});

io = socket(server);

io.on('connection', (socket) => {

    socket.on("SEND_MESSAGE", function(data) {
      io.emit("RECIEVE_MESSAGE", data);
    })
});