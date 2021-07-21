"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const withStyles_1 = __importDefault(require("@material-ui/core/styles/withStyles"));
const PageContainer = withStyles_1.default(() => ({
    root: {
        maxWidth: 1400,
    },
}))(Container_1.default);
exports.default = PageContainer;
