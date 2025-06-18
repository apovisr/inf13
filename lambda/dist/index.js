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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.handler = void 0;
const typeorm_1 = require("typeorm");
let appDataSource;
const handler = async (event) => {
    try {
        // Reuse existing connection if available
        if (!appDataSource || !appDataSource.isInitialized) {
            appDataSource = new typeorm_1.DataSource({
                type: 'mysql', // Change to 'mysql' or 'mariadb' if needed
                host: 'virtual-shop.ca6l6bos1fal.us-east-1.rds.amazonaws.com',
                port: 3306,
                username: 'admin',
                password: 'inf13lp20251',
                database: 'inf13',
                synchronize: false,
                logging: true,
                entities: [User],
                subscribers: [],
                migrations: [],
            });
            await appDataSource.initialize();
        }
        const userRepository = appDataSource.getRepository(User);
        const users = await userRepository.find(); // Fetch all users
        return users; // Return users as JSON response;
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error connecting to the database' }),
        };
    }
};
exports.handler = handler;
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Object)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'name' }),
    __metadata("design:type", Object)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'email' }),
    __metadata("design:type", Object)
], User.prototype, "email", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'USER' }) // Specify the table name
], User);
//# sourceMappingURL=index.js.map