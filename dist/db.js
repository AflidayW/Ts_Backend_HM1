"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.db = {
    videos: [{
            id: 1,
            title: "Fack",
            author: "Bukva",
            canBeDownloaded: true, // дефолтное значение
            minAgeRestriction: null, // дефолтное значение
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: ["P144"]
        }]
};
