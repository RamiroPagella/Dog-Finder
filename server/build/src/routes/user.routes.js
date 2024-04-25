"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userHandlers_1 = require("../handlers/userHandlers");
const middlewares_1 = require("../middlewares");
const multer_1 = __importDefault(require("multer"));
const userRouter = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
userRouter.post("/register", userHandlers_1.Register);
userRouter.post("/login", userHandlers_1.Login);
userRouter.put('/change-password', middlewares_1.verifyToken, userHandlers_1.changePassword);
userRouter.get("/user/info", middlewares_1.verifyToken, userHandlers_1.UserInfo);
exports.default = userRouter;
