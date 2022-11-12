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
exports.login = exports.retriveAll = exports.updatePassword = exports.updateName = exports.deleteAdmin = exports.createAdmin = void 0;
const admin_1 = __importDefault(require("../models/admin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = __importDefault(require("validator"));
const createToken = (_id, password) => {
    return jsonwebtoken_1.default.sign({ _id, password }, config_1.authSecret);
};
const retriveAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield admin_1.default.find({});
        res.status(200).json(admins);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.retriveAll = retriveAll;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield admin_1.default.login(email, password);
        const token = createToken(admin._id, password);
        res.status(200).json({ token, admin });
    }
    catch (error) {
        res.sendStatus(401);
    }
});
exports.login = login;
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            throw Error('name && email && password are required');
        }
        const exists = yield admin_1.default.findOne({ email: email });
        if (exists) {
            throw Error('this admin exists already');
        }
        if (!validator_1.default.isEmail(email)) {
            throw Error('not a valid email');
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const admin = new admin_1.default({
            name,
            email,
            password: hash
        });
        const createdAdmin = yield admin.save();
        res.status(200).json(createdAdmin);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.createAdmin = createAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield admin_1.default.findOneAndDelete({ _id: id });
        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.deleteAdmin = deleteAdmin;
const updateName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const admin = yield admin_1.default.findById(id);
        if (!admin) {
            throw Error('cannot find this admin');
        }
        if (name) {
            admin.name = name;
        }
        const updatedAdmin = yield admin.save();
        res.status(200).json(updatedAdmin);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.updateName = updateName;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const admin = yield admin_1.default.findById(id);
        if (!admin) {
            throw Error('cannot find this admin');
        }
        if (password) {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(password, salt);
            admin.password = hash;
        }
        const updatedAdmin = yield admin.save();
        res.status(200).json(updatedAdmin);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.updatePassword = updatePassword;
