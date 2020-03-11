const express = require("express")

const server = express()

server.use(express.json())


/**
 * Middleware que checa se o projeto existe
 */
function checkProjectExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);

    if (!project) {
        return res.status(400).json({ error: 'Project not found' });
    }

    return next();
}

/**
 * Middleware que dá log no número de requisições
 */
function logRequests(req, res, next) {

    console.count("Número de requisições");
  
    return next();
}
  
  server.use(logRequests);

const projects = []


//lista
server.get("/projects", (req, res) => {
    return res.json(projects)
})

//add
server.post("/projects", checkProjectExists, (req, res) => {
    const {id, title} = req.body

    const project = {
        id,
        title,
        tasks: []
    }

    projects.push(project)

    return res.json(project)
})

//edita
server.put("/projects/:id", (req, res) => {
    const { id } = req.params
    const { title } = req.body

    const project = projects.find(p => p.id == id);

    project.title = title;
  
    return res.json(projects);
})


//del
server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
  
    const projectIndex = projects.findIndex(p => p.id == id);
  
    projects.splice(projectIndex, 1);
  
    return res.send();
  });
 


//add tarefa
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.tasks.push(title);

    return res.json(project);
});



server.listen(3000)