"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Dog_model_1 = __importDefault(require("./Dog.model"));
const Likes_model_1 = __importDefault(require("./Likes.model"));
const DogPending_model_1 = __importDefault(require("./DogPending.model"));
let UserModel = class UserModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4
    }),
    __metadata("design:type", String)
], UserModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], UserModel.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false
    }),
    __metadata("design:type", Boolean)
], UserModel.prototype, "admin", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Dog_model_1.default),
    __metadata("design:type", Array)
], UserModel.prototype, "dogs", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => DogPending_model_1.default),
    __metadata("design:type", Array)
], UserModel.prototype, "pendingDogs", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Dog_model_1.default, () => Likes_model_1.default),
    __metadata("design:type", Array)
], UserModel.prototype, "likes", void 0);
UserModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'Users'
    })
], UserModel);
exports.default = UserModel;
