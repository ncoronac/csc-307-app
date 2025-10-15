// backend.js

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
});

// const addUser = (user) => {
//     users["users_list"].push(user);
//     return user;
// };

// const generateId = () => {
//     return Math.random().toString();
// };

// const deleteUserById = (id) => {
//     const index = users["users_list"].findIndex((user) => user["id"] === id);
//     if (index != -1) {
//         return users["users_list"].splice(index, 1)[0];
//     } else {
//         return undefined;
//     }
// };

// const findUserByNameAndJob = (name, job) => {
//     return users["users_list"].filter(
//         (user) => user["name"] === name && user["job"] === job
//     );
// };

// get user
app.get("/users", async (req, res) => {
    const name = req.query["name"];
    const job = req.query["job"];
    try {
        const result = await userServices.getUsers(name, job);
        res.send({ users_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
});

// get user by id
app.get("/users/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
        res.status(404).send("Resource not found.");
    else {
        res.send({ users_list: result });
    }
});

// add a new user
app.post("/users", async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
});

// detele a user
app.delete("/users/:id", async (req, res) => {
    const id = req.params["id"];
    try {
        const result = await userServices.deleteUserById(id);
        if (result === undefined) {
            res.status(404).send("Resource not found.");
        } else {
            res.send(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
});

// find user by name and job
app.get("/users/:name/:job", async (req, res) => {
    const name = req.params["name"];
    const job = req.params["job"];
    try {
        let result = await userServices.findUserByNameAndJob(name, job);

        if (result === undefined || result === null) {
            res.status(404).send("Resource not found.");
        } else {
            res.send(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});