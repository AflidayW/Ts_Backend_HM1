import express, { Express } from "express";
import { db } from "./db";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });
    app.get("/drivers", (req, res) => {
        // возвращаем всех водителей
        res.status(200).send(db.drivers);
    });
    app.get("/driverd/:id", (req, res) => {
        const driver = db.drivers.find(f_driver => f_driver.id === +req.params.id)

        if (!driver) {
            res.sendStatus(404).send({ message: "Driver Not Found" });
        }

        res.sendStatus(200).send(driver);
    })
    app.post("/drivers", (req, res) => {

        
        const newDriver = {
            id: db.drivers.length ? db.drivers[db.drivers.length - 1].id + 1 : 1,
            name: req.body.name,
            car: req.body.car
        }
        db.drivers.push(newDriver)
        res.status(201).send(newDriver)
    })
    // app.post("/drivers", (req, res) => {
    //     //1) проверяем приходящие данные на валидность
    //     //2) создаем newDriver
    //     const newDriver: Driver = {
    //         id: db.drivers.length ? db.drivers[db.drivers.length - 1].id + 1 : 1,
    //         status: DriverStatus.Online,
    //         createdAt: new Date(),
    //         ...req.body
    //     };
    //     //3) добавляем newDriver в БД
    //     db.drivers.push(newDriver);
    //     //4) возвращаем ответ
    //     res.status(201).send(newDriver);
    // });
    app.delete("/testing/all-data", (req, res) => {
        db.drivers = [];
        res.send(204).send({ message: "No content" })
        return;
    });
    return app;
};



