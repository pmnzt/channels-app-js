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
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const channelSchema = new Schema({
    name: {
        type: String,
        maxlenght: 255,
        required: true
    },
    desc: {
        type: String,
        maxlenght: 2000
    },
    urls: {
        type: Array,
        default: []
    },
    belongsTo: {
        type: String,
        required: true
    },
    publisherId: {
        type: String,
        required: true
    }
});
channelSchema.methods.addUrl = function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        const urls = this.urls;
        // validation 
        const exists = urls.findIndex((u) => u === url);
        if (exists != -1) {
            throw Error(`urls cannot be duplicated`);
        }
        urls.push(url);
        this.urls = urls;
        const updatedChannel = yield this.save();
        return updatedChannel;
    });
};
channelSchema.methods.editUrl = function (old_url, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const urls = this.urls;
        const exists = urls.findIndex((u) => u === old_url);
        if (exists == -1) {
            throw Error('cannot find that url');
        }
        urls[exists] = url;
        this.urls = urls;
        const updatedChannel = yield this.save();
        return updatedChannel;
    });
};
channelSchema.methods.deleteUrl = function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        const urls = this.urls;
        const filterdUrls = urls.filter((value) => value !== url);
        this.urls = filterdUrls;
        const updatedChannel = yield this.save();
        return updatedChannel;
    });
};
exports.default = mongoose_1.default.model('Channel', channelSchema);
