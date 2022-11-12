"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const channels_1 = require("../controllers/channels");
const admin_1 = require("../middleware/admin");
const router = express_1.default.Router();
router.post('/', admin_1.admin, channels_1.createChannel);
router.patch('/:id', admin_1.admin, channels_1.updateChannel);
router.delete('/:id', admin_1.admin, channels_1.deleteChannel);
router.get('/all', channels_1.retriveAll);
router.get('/:id', channels_1.getChannel);
exports.default = router;
