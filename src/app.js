const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

let repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const repositoriesTemp = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repositoriesTemp);

  return response.json({...repositoriesTemp});

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const elementIndex = repositories.findIndex((item) => item.id === id);

  if(elementIndex === -1){
    return response.status(404).json({message: "Repository not found",elementIndex});
  }

  let repositoriesValue = repositories;


  return response.json({repositoriesValue, elementIndex})

  

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoriesTemp = repositories.filter((item) => item.id !== id)

  repositories = repositoriesTemp;

  return response.json(repositories);

});

app.post("/repositories/:id/like", (request, response) => {
  
});

module.exports = app;
