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
exports.createCategory = exports.editCategory = exports.deleteCategory = exports.getChannels = exports.retriveAll = void 0;
const category_1 = __importDefault(require("../models/category"));
const category_2 = __importDefault(require("../models/category"));
const channel_1 = __importDefault(require("../models/channel"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const admin = req.admin;
    try {
        const category = new category_2.default({
            name: name,
            publisherId: admin._id
        });
        const createdCategory = yield category.save();
        res.status(200).json(createdCategory);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.createCategory = createCategory;
const retriveAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_2.default.find({});
        res.status(200).json(categories);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.retriveAll = retriveAll;
const getChannels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const channels = yield channel_1.default.find({ belongsTo: id });
        res.status(200).json(channels);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.getChannels = getChannels;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield channel_1.default.deleteMany({ belongsTo: id });
        yield category_2.default.deleteOne({ _id: id });
        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.deleteCategory = deleteCategory;
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedCategory = yield category_1.default.updateOne({ _id: id }, {
            name: name
        });
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.editCategory = editCategory;
