import app from "./server.js"
import { MongoClient, ServerApiVersion } from 'mongodb'
// //import LoginDAO from "./dao/loginDAO.js " //   data access object

const Users = 'Users'
const uri = `mongodb+srv://19007247:blprQB3W0sLcwugA@cluster0.pl3qd4i.mongodb.net/Users?retryWrites=true&w=majority` // connection string


//connection to the database
const port = 8000
MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    const db = client.db(Users)
    app.locals.db = db;

    // Unique index on the emails field
    // await db.collection('Users').createIndex({ email: 1 }, { unique: true });


    const usersCollection = db.collection(Users);
    const users = await usersCollection.find().toArray();
    console.log('Users:', users);

    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })


