const axios = require("axios");

const BASE_URL = "http://localhost:3000";

test("App should be running", async () => {
  const res = await axios.get(BASE_URL);
  expect(res.status).toBe(200);
});

test("Products endpoint returns data", async () => {
  const res = await axios.get(`${BASE_URL}/api/products`);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.data)).toBe(true);
});

test("Error endpoint returns 500", async () => {
  try {
    await axios.get(`${BASE_URL}/api/error`);
  } catch (err) {
    expect(err.response.status).toBe(500);
  }
});