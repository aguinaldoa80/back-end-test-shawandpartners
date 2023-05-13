import axios from "axios";

const baseUrl = 'https://api.github.com'

const api = axios.create({
    baseURL: baseUrl,
    headers: {
       'Accept': 'application/vnd.github+json',
       'Content-Type': 'application/json',
       'X-GitHub-Api-Version': '2022-11-28'
     },
})

export default api;