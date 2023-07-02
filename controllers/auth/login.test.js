const express = require("express");
const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const ctrl = require("./");
const { validateBody } = require("../../middlewares");
const { loginSchema } = require("../../schemas");
const { DB_HOST, PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.post("/api/users/login/", validateBody(loginSchema), ctrl.login);

let server

describe("POST /api/users/login", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(DB_HOST);
    server = await app.listen(PORT);
      console.log("Testing server connection.");
    } catch (error) {
      console.log("Connection error: ", error);
    }
  });

  afterAll(() => {
    mongoose.connection.close()
    server.close()
});

  test("Should return data-object with status 200", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "jatiho5447@dotvilla.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);

    expect(typeof response.body).toBe("object");
    expect(() => response.body.hasOwnProperty("token").toBe(true));
    expect(() => response.body.hasOwnProperty("user").toBe(true));
    const {token, user} = response.body

    expect(typeof response.body.token).toBe('string');
    expect(token.trim().length > 0).toBe(true);


    expect(typeof user).toBe('object');
    expect(Object.keys(user).length).toBe(3);
    expect(() => user.hasOwnProperty("name").toBe(true));
    expect(typeof user.name).toBe('string');
    expect(() => user.hasOwnProperty("email").toBe(true));
    expect(typeof user.email).toBe('string');
    expect(() => user.hasOwnProperty("subscription").toBe(true));
    expect(typeof user.subscription).toBe('string');
    expect(['starter', 'pro', 'business']).toContain(user.subscription);
  });
});
