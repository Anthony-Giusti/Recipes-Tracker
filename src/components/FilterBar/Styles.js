"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const makeStyles_1 = __importDefault(require("@material-ui/core/styles/makeStyles"));
exports.default = makeStyles_1.default((theme) => ({
    navBtn: {
        margin: '0.3em',
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
}));
