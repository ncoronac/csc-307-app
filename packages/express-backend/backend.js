// backend.js

import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Deniss",
      job: "Bartender"
    }
  ]
};

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const findUsersByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUsersById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const generateId = () => {
    return Math.random().toString();
};

const deleteUserById = (id) => {
    const index = users["users_list"].findIndex((user) => user["id"] === id);
    if (index != -1) {
        return users["users_list"].splice(index, 1)[0];
    } else {
        return undefined;
    }
};

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUsersByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUsersById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = generateId();
    const result = addUser(userToAdd);
    res.status(201).send(result);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const result = deleteUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.get("/users/:name/:job", (req, res) => {
    const name = req.params["name"];
    const job = req.params["job"];
    let result = findUserByNameAndJob(name, job);

    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});