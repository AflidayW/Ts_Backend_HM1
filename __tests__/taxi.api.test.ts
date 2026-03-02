import request from "supertest";
import app from "../src/index";
import { response } from "express";

describe("GET /", () => {
    let Created_Driver: any;
    beforeAll(async () => {
        await request(app).delete("/testing/all-data")
    })

    it("Предпологает возврат Hello world", async () => {
        await request(app).get("/").expect(200, "Hello world!");
    })
    it("Should return empty array", async () => {
        await request(app).get("/drivers").expect(200, [])
    })
    it("Shoul post correct newDriver", async () => {
        const Created_Responce = await request(app).post("/drivers").send({ name: "Toya", car: "Bulshit" }).expect(201);
        Created_Driver = Created_Responce.body;

        expect(Created_Driver).toEqual({
            id: expect.any(Number),
            name: "Toya",
            car: "Bulshit"

        }
        )
        await request(app).get("/drivers").expect(200, [Created_Driver])
        console.log([Created_Driver])
    })


}
);