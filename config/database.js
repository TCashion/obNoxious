const mongoose = require('mongoose');

// commented out during production until database is connected 

// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// });

// const db = mongoose.connection;

// db.on('connected', () => {
//   console.log(`Connected to MongoDB ${db.name} ${db.host}:${db.port}`);
// });