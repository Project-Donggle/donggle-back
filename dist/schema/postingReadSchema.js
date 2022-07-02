"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postingSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    coordinates: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    emoji: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    contents: {
        type: String,
        required: true,
    },
    sympathy: {
        type: Number,
        default: 0,
    },
    sympathyPeople: {
        type: Array,
    },
    comments: {
        type: Array,
    },
});
exports.default = mongoose_1.default.model('postContents', postingSchema);
