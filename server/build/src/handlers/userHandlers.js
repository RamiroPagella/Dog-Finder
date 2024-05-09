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
exports.changePassword = exports.UserInfo = exports.Login = exports.Register = void 0;
const userServices_1 = require("../services/userServices");
const User_model_1 = __importDefault(require("../models/User.model"));
const Dog_model_1 = __importDefault(require("../models/Dog.model"));
const DogPending_model_1 = __importDefault(require("../models/DogPending.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const User = yield (0, userServices_1.registerUser)((0, userServices_1.validateUser)({
            username,
            email,
            password,
        }));
        const token = (0, userServices_1.generateToken)({
            id: User.id,
            admin: User.admin,
        });
        console.log(User);
        return res.status(201).json({ authenticated: true, token, User });
    }
    catch (error) {
        let status = 500;
        let errorMsg = "";
        if (error instanceof Error) {
            const { message } = error;
            if (message === "Email already in use")
                status = 409;
            errorMsg = error.message;
        }
        res.status(status).json({
            message: errorMsg,
            authenticated: false,
        });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const User = yield (0, userServices_1.LogUser)({ email, password });
        const userInfoToToken = { id: User.id, admin: User.admin };
        const token = (0, userServices_1.generateToken)(userInfoToToken);
        res.status(201).json({ authenticated: true, token: token, User });
    }
    catch (error) {
        console.log(error);
        let status = 500;
        let errorMsg = "";
        if (error instanceof Error) {
            if (error.message === "User not found")
                status = 404;
            if (error.message === "Incorrect password")
                status = 401;
            errorMsg = error.message;
        }
        res.status(status).json({
            authenticated: false,
            error: error instanceof Error ? error.name : error,
            message: errorMsg,
        });
    }
});
exports.Login = Login;
const UserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user)
            res.status(401);
        const User = yield User_model_1.default.findByPk(user === null || user === void 0 ? void 0 : user.id, {
            include: [
                { model: Dog_model_1.default, as: "likes" },
                { model: Dog_model_1.default, as: "dogs" },
                { model: DogPending_model_1.default, as: "pendingDogs" },
            ],
            attributes: {
                exclude: ["password"],
            },
        });
        if (!User)
            return res.status(400).send("User not found");
        return res.status(200).json(User);
    }
    catch (error) {
        if (error instanceof Error)
            return res
                .status(500)
                .json({ error: error.name, message: error.message });
        res.status(500);
    }
});
exports.UserInfo = UserInfo;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { actualPwd, newPwd } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!actualPwd || actualPwd === "" || !newPwd || newPwd === "") {
            return res.status(400).send("Incorrect or missing data");
        }
        const User = yield User_model_1.default.findByPk(userId);
        if (!User)
            return res.status(400).send("User not found");
        const isPwdCorrect = yield bcryptjs_1.default.compare(actualPwd, User.password);
        if (!isPwdCorrect) {
            return res.status(403).send("Incorrect password");
        }
        const hashedPwd = yield bcryptjs_1.default.hash(newPwd, 10);
        yield User.update({ password: hashedPwd }, {
            where: {
                id: userId,
            },
        });
        res.status(200).send("Password changed successfully");
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : error });
    }
});
exports.changePassword = changePassword;
