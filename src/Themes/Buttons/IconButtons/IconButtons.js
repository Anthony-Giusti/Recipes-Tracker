"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButtonWithBackgroundDefault = exports.IconButtonWithBackground = void 0;
// @ts-nocheck
const withStyles_1 = __importDefault(require("@material-ui/core/styles/withStyles"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const IconButtonWithBackground = withStyles_1.default((theme) => ({
    root: {
        borderRadius: '10%',
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
}))(IconButton_1.default);
exports.IconButtonWithBackground = IconButtonWithBackground;
const IconButtonWithBackgroundDefault = withStyles_1.default((theme) => ({
    root: {
        borderRadius: '50%',
        color: theme.palette.getContrastText(theme.palette.default.main),
        backgroundColor: theme.palette.default.main,
        '&:hover': {
            color: theme.palette.primary.light,
            backgroundColor: theme.palette.primary.dark,
        },
    },
}))(IconButton_1.default);
exports.IconButtonWithBackgroundDefault = IconButtonWithBackgroundDefault;
