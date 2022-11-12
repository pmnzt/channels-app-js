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
exports.getChannel = exports.retriveAll = exports.deleteChannel = exports.updateChannel = exports.createChannel = void 0;
const channel_1 = __importDefault(require("../models/channel"));
const createChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { channel_name, desc, belongs_to } = req.body;
    const admin = req.admin;
    try {
        const channel = new channel_1.default();
        if (channel_name) {
            channel.name = channel_name;
        }
        if (desc) {
            channel.desc = desc;
        }
        if (belongs_to) {
            channel.belongsTo = belongs_to;
        }
        channel.publisherId = admin._id;
        const createdChannel = yield channel.save();
        res.status(200).json({
            createdChannel
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.createChannel = createChannel;
const updateChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { channel_name, desc } = req.body;
    try {
        const channel = yield channel_1.default.findById(id);
        if (!channel) {
            throw Error('cannot find the channel');
        }
        if (channel_name) {
            channel.name = channel_name;
        }
        if (desc) {
            channel.desc = desc;
        }
        const updatedChannel = yield channel.save();
        res.status(200).json({
            updatedChannel
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.updateChannel = updateChannel;
const deleteChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedChannel = yield channel_1.default.findOneAndDelete({ _id: id });
        res.status(200).json({
            deletedChannel
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.deleteChannel = deleteChannel;
const retriveAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all_channels = yield channel_1.default.find({});
        res.status(200).json(all_channels);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.retriveAll = retriveAll;
const getChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const channel = yield channel_1.default.findById(id);
        if (!channel) {
            throw Error('cannot find the channel');
        }
        res.status(200).json(channel);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.getChannel = getChannel;
