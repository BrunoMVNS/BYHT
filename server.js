import express from "express"
import cors from "cors"
// import login from "./api/login.route.js"
import path from "path" //allow to know urls location
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express()


let initialPath = path.join(__dirname, "public")

const staticFilesPath = path.join(__dirname, "public")


app.use(cors())
app.use(express.json()) // Parse JSON requests
app.use(express.static(initialPath))
app.use(express.static(staticFilesPath))

//Back LINKS
app.get('/', (req, res) => {
  res.sendFile(path.join(initialPath, "index.html"))
})

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(initialPath, "login.html"))

})

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(initialPath, "register.html"))

})

app.listen(8000, (req, res) => {
  console.log(`listening on port 8001`)
})


app.post('/register-user', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name.length || !email.length || !password.length) {
    res.json('Fill all the fields');
  } else {
    try {

      const result = await req.app.locals.db.collection('Users').insertOne({ name, email, password })
      // .returning(["name", "email"])
      console.log('Inserted user:', result.insertedId);
      res.sendStatus(201);
    } catch (err) {
      if (err.detail.includes('Email already exists')) {
        // Duplicate email error
        res.json('Email already exists');
      } else {
        // Other error occurred
        res.json('Error occurred');
      }
    }
  }
});

app.post('/login-user', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json('Email and password are required');
    return;
  }

  try {
    const user = await req.app.locals.db.collection('Users').findOne({ email, password });

    if (!user) {
      res.status(401).json('Invalid credentials');
      return;
    }
    // User login successful
    res.status(200).json('User logged in successfully');
  } catch (error) {
    console.error('Error logging user in:', error);
    res.status(500).json('An error occurred');
  }
});





export default app

// The `(id)` have to be changed to _id 
