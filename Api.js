import axios from "axios";

const baseUrl = 'https://api.github.com'

const api = axios.create({
    baseURL: baseUrl,
    headers: {
       'Accept': 'application/vnd.github+json',
       'Content-Type': 'application/json',
       'X-GitHub-Api-Version': '2022-11-28',
       'Authorization': 'Bearer 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'
     },
})

export default api;