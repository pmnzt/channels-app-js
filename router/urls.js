"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const urls_1 = require("../controllers/urls");
const admin_1 = require("../middleware/admin");
const router = express_1.default.Router();
router.use(admin_1.admin);
router.post('/', urls_1.createUrl);
router.patch('/', urls_1.updateUrl);
router.post('/delete', urls_1.deleteUrl);
exports.default = router;
