import express, { Express } from "express";
import { db } from "./db";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });
    app.get("/videos", (req, res) => {
        // возвращаем все видео
        res.status(200).send(db.videos);
    });
    app.get("/videos/:id", (req, res) => {

        const video = db.videos.find(f_video => f_video.id === +req.params.id)

        if (!video) {
            return res.sendStatus(404).send({ message: "Video Not Found" });    
        }

        res.sendStatus(200).send(video);
    })
    app.post("/videos", (req, res) => {
        const { title, author, availableResolutions } = req.body;
        const errors = [];

        if (!title || title.trim() === "" || title.length > 40) {
            errors.push({ field: "title", message: "Invalid title" });
        }

        if (!author || author.trim === "" || author.length > 20) {
            errors.push({ field: "author", message: "Invalid author" });
        }
        if (!availableResolutions || !Array.isArray(availableResolutions) ||
            availableResolutions.length === 0) {
            errors.push({ field: "availableResolutions", message: "Invalid resolutions" });

            if (errors.length > 0) {
                return res.status(400).send({ errorsMessages: errors });
            };
            const newVideo = {
                id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
                title,
                author,
                canBeDownloaded: true,        // дефолтное значение
                minAgeRestriction: null,      // дефолтное значение
                createdAt: new Date().toISOString(),
                publicationDate: new Date().toISOString(),
                availableResolutions
            };
            db.videos.push(newVideo)
            res.status(201).send(newVideo)
        }
    });
    app.put("/videos/:id", (req, res) => {
        const video = db.videos.find(del => del.id === +req.params.id)
        const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction } = req.body;
        const errors = [];
        if (!video) {
            return res.sendStatus(404)
        }

        if (!title || title.trim() === "" || title.length > 40) {
            errors.push({ field: "title", message: "Invalid title" });
        }
        if (!author || author.trim() === "" || author.length > 20) {
            errors.push({ field: "author", message: "Invalid author" });
        }
        if (!availableResolutions || !Array.isArray(availableResolutions) ||
            availableResolutions.length === 0) {
            errors.push({ field: "availableResolutions", message: "Invalid resolutions" })
        }

        if (errors.length > 0) {
            return res.status(400).send({ errorsMessages: errors })
        }
        video.title = title ?? video.title;
        video.author = author ?? video.author;
        video.availableResolutions = availableResolutions ?? video.availableResolutions;
        video.canBeDownloaded = canBeDownloaded ?? video.canBeDownloaded;        // дефолтное значение
        video.minAgeRestriction = minAgeRestriction ?? video.minAgeRestriction;

        return res.sendStatus(204)

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
    app.delete("/vedios/:id", (req, res) => {
        const Check = db.videos.find(del => del.id === +req.params.id)

        if (!Check) {
            return res.sendStatus(404)
        }
        db.videos = db.videos.filter(del => del.id !== +req.params.id)
        res.sendStatus(204)
        return;
    });
    app.delete("/testing/all-data", (req, res) => {
        db.videos = [];
        res.send(204).send({ message: "No content" })
        return;
    });
    return app;
};



