"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postingReadSchema_1 = __importDefault(require("../schema/postingReadSchema"));
mongoose_1.default.connect('mongodb://jjaegii:chlwogur99!@localhost:27017/admin')
    .then(() => {
    console.log("Connected");
})
    .catch((err) => {
    console.log(err);
});
postingReadSchema_1.default.find(function (error, postContents) {
    if (error) {
        console.log("error" + error);
    }
    else {
        postContents.forEach(function (row) {
            console.log("data::" + row.title);
        });
    }
});
