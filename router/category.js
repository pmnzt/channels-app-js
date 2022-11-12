"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = require("../controllers/category");
const admin_1 = require("../middleware/admin");
const router = express_1.default.Router();
router.get('/all', category_1.retriveAll);
router.get('/:id/channels', category_1.getChannels);
router.post('/', admin_1.admin, category_1.createCategory);
router.delete('/:id', admin_1.admin, category_1.deleteCategory);
router.patch('/:id', admin_1.admin, category_1.editCategory);
exports.default = router;
