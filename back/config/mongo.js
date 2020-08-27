import mongoose from "mongoose"
import config from './index.js'

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`

mongoose.connect(CONNECTION_URL,{
    useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongo has been successfully connected')
});

mongoose.connection.on('reconnected', () => {
    console.log('Mongo reconnected')
});

mongoose.connection.on('error', error => {
    console.log('Mongo has an error:',error);
    mongoose.disconnect()
});

mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected.');
});