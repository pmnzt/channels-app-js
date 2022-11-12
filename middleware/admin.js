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
exports.admin = void 0;
const admin_1 = __importDefault(require("../models/admin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            throw Error('authorization header is missing');
        }
        const token = authorization.split(' ')[1];
        if (!token) {
            throw Error('token is missing');
        }
        const { _id, password } = jsonwebtoken_1.default.verify(token, config_1.authSecret);
        const admin = yield admin_1.default.findOne({ _id: _id });
        if (!admin) {
            throw Error('youre not an admin');
        }
        const match = yield bcrypt_1.default.compare(password, admin.password);
        if (!match) {
            throw Error('token is inavlid');
        }
        req.admin = admin;
        next();
    }
    catch (error) {
        res.status(405).json({
            error: error.message
        });
    }
});
exports.admin = admin;
