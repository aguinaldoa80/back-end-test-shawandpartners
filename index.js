import express from 'express'
import axios from 'axios'

const baseUrl = 'https://api.github.com'
const url = 'http://localhost'
const port = 8080

const api = axios.create({
    baseURL: baseUrl,
    headers: {
       'Accept': 'application/vnd.github+json',
       'Content-Type': 'application/json',
       'X-GitHub-Api-Version': '2022-11-28'
     },
})
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
    const ret = await api.get(req.url)
    .then(response => {
        return response;
    })
    .catch(err => {
        console.error(err);
        return err;
    });
    listUsers.urlNextPage = ret.headers.link.match(nextPattern)[0].replace("https://api.github.com", `${url}:${port}`);
    listUsers.users = ret.data;
    res.send(listUsers);
})

/*
 *  GET - /api/users/:username/details
 *  This endpoint must return the details of a GitHub user 
 */
app.get('/users/:username/details', async(req, res) => {
    const ret = await api.get('/users/'+req.params.username)
    .then(response => {
        return response;
    })
    .catch(err => {
        console.error(err);
        return err;
    });
    res.send(ret.data);
})

/*
 *  GET - /api/users/:username/repos
 *  This endpoint must return a list with all user repositories 
 */
app.get('/users/:username/repos', async(req, res) => {
    const ret = await api.get(req.url)
    .then(response => {
        return response;
    })
    .catch(err => {
        console.error(err);
        return err;
    });
    res.send(ret.data);
})