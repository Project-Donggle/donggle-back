import mongoose from 'mongoose';

const connect = () => {
  mongoose
    .connect(process.env.DBURL)
    .then(() => {
      console.log('DB Connected');
    })
    .catch((err) => {
      console.log(err);
    });
};

mongoose.connection.on('error', (error) => {
  console.error('DB Connection error', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('mongodb has disconnected, retry connection');
  connect();
});

export default connect;
