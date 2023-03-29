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
    if (!project) {
        res.status(404).send(`Project with id = ${req.params.id} is not found`)
    }
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(project);
});

app.get('/paging', paginatedResults(db.projects), (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(res.paginatedResults);
    // res.json({result: req.query.page})
});

app.get('/pagination', paginatedResults(db.projects), (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({
        pagination: res.paginatedResults
    });
});

   
  function paginatedResults(model) {
    return (req, res, next) => {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
   
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
   
      const results = {};
      if (endIndex < model.length) {
        results.next = {
          page: page + 1,
          limit: limit
        };
      }
   
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        };
      }
   
      results.results = model.slice(startIndex, endIndex);
   
      res.paginatedResults = results;
      next();
    };
  }

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})