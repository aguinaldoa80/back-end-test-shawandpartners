import express, { response } from 'express'
import api from "./Api.js";

const url = 'http://localhost'
const port = 8080
const app = express()

app.listen(port, () => console.log(`Application 'back-end-test-shawandpartners' started at Port '${port}' `))

const listUsers = {
    urlNextPage: "",
    users:[]
}
const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
/*
 *  GET - /api/users?since={number}
 *  This endpoint must return a list of GitHub users and the link for the next page. 
 */
app.get('/users', async(req, res) => {
    await api.get(req.url)
    .then(response => {
        listUsers.urlNextPage = response.headers.link.match(nextPattern)[0].replace("https://api.github.com", `${url}:${port}`);
        listUsers.users = response.data;
        res.send(listUsers);
    })
    .catch(error => {
        res.status(error.response.status).send(error?.response?.data ?? error.message ?? "Error in request...");
    });

})

/*
 *  GET - /api/users/:username/details
 *  This endpoint must return the details of a GitHub user 
 */
app.get('/users/:username/details', async(req, res) => {
    await api.get('/users/'+req.params.username)
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        res.status(error.response.status).send(error?.response?.data ?? error.message ?? "Error in request...");
    });
})

/*
 *  GET - /api/users/:username/repos
 *  This endpoint must return a list with all user repositories 
 */
app.get('/users/:username/repos', async(req, res) => {
    await api.get(req.url)
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        res.status(error.response.status).send(error?.response?.data ?? error.message ?? "Error in request...");
    });
})