const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

//very very important for connectin Backend
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://phuser:phuser@cluster0.w1zgr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const productCollection = client.db("foodexpro").collection("product");

     // TO SHOW DATA AT UI
    app.get('/product',async(req,res)=>{
      const query={};
      const cursor = productCollection.find(query);
      const products =await cursor.toArray();
      res.send(products);
    })

    app.post('/product',async(req,res)=>{          //Sending data to DB
      const newProduct=req.body;
      console.log('adding new products HOLO ',newProduct);
      const resultKI =await productCollection.insertOne(newProduct); // FOR sending data to DB
      res.send(resultKI)
      //res.send({resultKI :'SuCCess'})
    })

//  }) } const result = await userCollection.insertOne(user);
    
//     console.log(`OWWW!!!User was inserted with the _id: ${result.insertedId}`);
    // create a document to insert
    
    
    
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// client.connect(err => {
//   const collection = client.db("foodExpress").collection("users");
//   console.log("dB connected hoiche");
//   // perform actions on the collection object
//   client.close();
// });


  
// API/ROUTE/ENTRY point
app.get('/', (req, res) => {
  res.send(' Im on root!!! Hello I am here !') });

  app.get('/we', (req, res) => {
    res.send('  we are here-2nd time !') })
  

app.get('/you', (req, res)=>{
  res.send("  YOUUU!!!ki kos na kos")
})




app.listen(port, () => {
  console.log(`YES YES  listening on port ${port}`)
})