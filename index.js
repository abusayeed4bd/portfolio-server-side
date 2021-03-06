const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

var cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ou2er.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {

        await client.connect();
        const projectCollection = client.db('portfolio').collection('projects');

        app.get('/projects', async (req, res) => {
            const q = req.query;
            const projects = await projectCollection.find(q).toArray();
            res.send(projects);
        })

        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const project = await projectCollection.findOne(filter);
            res.send(project);
        })



    }
    finally {

    }
}
run().catch(console.dir)





app.get('/', (req, res) => {
    res.send('abusayeed')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})