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
exports.processPayment = void 0;
const crypto_1 = require("crypto");
const order_model_1 = __importDefault(require("../models/order.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../models/product.model"));
const errorParser_1 = require("../utils/errorParser");
const processPayment = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionID = (0, crypto_1.randomBytes)(64).toString("base64");
    orderData["transactionID"] = transactionID;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const orderItems = orderData === null || orderData === void 0 ? void 0 : orderData.orderItems;
        for (const item of orderItems) {
            const result = yield product_model_1.default.updateOne({ title: item.productTitle, quantity: { $gte: item.productCount } }, { $inc: { quantity: -(item.productCount) } }, { session });
            if (result.modifiedCount == 0) {
                yield session.abortTransaction();
                yield session.endSession();
                return { done: false, message: "Possibly bad request" };
            }
        }
        const response = yield order_model_1.default.create([orderData], { session });
        if (!response) {
            yield session.abortTransaction();
            yield session.endSession();
            throw new Error("Order not created");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return { done: true, message: transactionID };
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        return { done: false, message: (0, errorParser_1.parseMongoError)(error) };
    }
});
exports.processPayment = processPayment;
