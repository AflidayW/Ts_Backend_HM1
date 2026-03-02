import express from "express";
import { setupApp } from "./setup-app";

const app = express();
setupApp(app);

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
}

module.exports = app;
// запуск приложения
// app.listen(PORT, () => {
//     console.log(`Example app listening on port ${PORT}`);
// });