const express = require('express');
const db = require("./db.json");
const app = express();
const port = process.env.PORT || 5500

app.get('/projects', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(db.projects);
});

app.get('/projects/:id', (req, res) => {
    const project = db.projects.find(p => p.id === parseInt(req.params.id));
    if(!project) {
        res.status(404).send(`Project with id = ${req.params.id} is not found`)
    }
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(project);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})