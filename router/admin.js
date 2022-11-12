"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
const admin_2 = require("../middleware/admin");
const owner_1 = require("../middleware/owner");
const router = express_1.default.Router();
router.post('/login', admin_1.login);
// this route acts like the /all route. 
// However this route will also be accessible for admins
router.get('/admins', admin_2.admin, admin_1.retriveAll);
router.use(owner_1.owner);
router.post('/', admin_1.createAdmin);
router.delete('/:id', admin_1.deleteAdmin);
router.patch('/:id/name', admin_1.updateName);
router.patch('/:id/password', admin_1.updatePassword);
router.get('/all', admin_1.retriveAll);
exports.default = router;
