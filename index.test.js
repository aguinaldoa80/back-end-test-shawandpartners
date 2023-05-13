const app = require('./server.js');
const supertest = require("supertest");
const request = supertest(app);


it("Get repositories from user", async function () {
    const response = await request.get("/users/mojombo/repos");
    expect(response.status).toBe(200);
},15000);

it("Get details from user", async function () {
    const response = await request.get("/users/mojombo/details");
    expect(response.status).toBe(200);
},15000);

it("Get details from user with error", async function () {
    const response = await request.get("/users/mojomd5d5bo/details");
    expect(response.status).toBe(404);
},15000);

it("Get list users", async function () {
    const response = await request.get("/users?since=1");
    expect(response.status).toBe(200);
},15000);