"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.updateUrl = exports.createUrl = void 0;
const channel_1 = __importDefault(require("../models/channel"));
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, channel_id } = req.body;
    try {
        const channel = yield channel_1.default.findById(channel_id);
        const createdUrl = yield channel.addUrl(url);
        res.status(200).json({
            createdUrl
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
exports.createUrl = createUrl;
const updateUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { old_url, url, channel_id } = req.body;
    try {
        const channel = yield channel_1.default.findById(channel_id);
        const editedUrl = yield channel.editUrl(old_url, url);
        res.status(200).json({
            editedUrl
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.updateUrl = updateUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, channel_id } = req.body;
    try {
        const channel = yield channel_1.default.findById(channel_id);
        const deletedUrl = yield channel.deleteUrl(url);
        res.status(200).json({
            deletedUrl
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.deleteUrl = deleteUrl;
