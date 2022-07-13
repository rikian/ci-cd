const request = require("supertest");
const { server } = require("../server");

test("respon status code 200", async () => {
  const res = await request(server).get("/");
  const result = {
    code: res.statusCode,
    "content-type": res.headers["content-type"],
  };
  expect(result).toEqual({
    code: 200,
    "content-type": "text",
  });
});
