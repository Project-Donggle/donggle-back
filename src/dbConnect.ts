import mongoose from 'mongoose';

const connect = () => {
    if(process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://jjaegii:chlwogur99!@localhost:27017/admin')
    .then(() => {
    console.log("Connected");
    })
    .catch((err) => {
    console.log(err);
    });
}

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
    console.error('mongodb has disconnected, retry connection');
    connect();
})

export default connect;