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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const morgan_1 = __importDefault(require("morgan"));
const Dog_model_1 = __importDefault(require("./models/Dog.model"));
const data_1 = __importDefault(require("../data"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const dog_routes_1 = __importDefault(require("./routes/dog.routes"));
const User_model_1 = __importDefault(require("./models/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cloudinary_1 = require("cloudinary");
const server = (0, express_1.default)();
(0, dotenv_1.config)();
server.use((0, cors_1.default)());
server.use((0, morgan_1.default)("dev"));
server.use(express_1.default.urlencoded({ extended: false }));
server.use(express_1.default.json());
server.use("/", user_routes_1.default, dog_routes_1.default);
const PORT = 3000;
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.sync();
        const dogCount = yield Dog_model_1.default.count();
        if (dogCount === 0)
            Dog_model_1.default.bulkCreate(data_1.default);
        const hashedAdminPWd = yield bcryptjs_1.default.hash(process.env.ADMIN_PASSWORD, 10);
        const adminUser = yield User_model_1.default.findOne({
            where: {
                username: "admin_user",
            },
        });
        if (!adminUser) {
            yield User_model_1.default.create({
                username: "admin_user",
                password: hashedAdminPWd,
                email: "adminuser@gmail.com",
                admin: true,
            });
        }
        cloudinary_1.v2.config({
            cloud_name: "dev7ozagf",
            api_key: "221169611148754",
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        server.listen(PORT, () => {
            console.log(`Server raised on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
initialize();
