"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.sendStatus(200);
});
const channels_1 = __importDefault(require("./router/channels"));
app.use('/channels', channels_1.default);
const urls_1 = __importDefault(require("./router/urls"));
app.use('/urls', urls_1.default);
const category_1 = __importDefault(require("./router/category"));
app.use('/category', category_1.default);
const admin_1 = __importDefault(require("./router/admin"));
app.use('/admin', admin_1.default);
mongoose_1.default.connect(config_1.dbUri, (error) => {
    if (error) {
        return console.log(error.message);
    }
    app.listen(config_1.port, () => {
        console.log(`server running on port of ${config_1.port}`);
    });
});
