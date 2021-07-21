"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButtonWithBackground = exports.IntoleranceButton = exports.DietButton = exports.CategoryButton = void 0;
const withStyles_1 = __importDefault(require("@material-ui/core/styles/withStyles"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const blue_1 = __importDefault(require("@material-ui/core/colors/blue"));
const green_1 = __importDefault(require("@material-ui/core/colors/green"));
const red_1 = __importDefault(require("@material-ui/core/colors/red"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const CategoryButton = withStyles_1.default((theme) => ({
    root: {
        color: theme.palette.getContrastText(blue_1.default[100]),
        backgroundColor: blue_1.default[100],
        '&:hover': {
            backgroundColor: blue_1.default[200],
        },
    },
}))(Button_1.default);
exports.CategoryButton = CategoryButton;
const DietButton = withStyles_1.default((theme) => ({
    root: {
        color: theme.palette.getContrastText(green_1.default[100]),
        backgroundColor: green_1.default[100],
        '&:hover': {
            backgroundColor: green_1.default[200],
        },
    },
}))(Button_1.default);
exports.DietButton = DietButton;
const IntoleranceButton = withStyles_1.default((theme) => ({
    root: {
        color: theme.palette.getContrastText(red_1.default[100]),
        backgroundColor: red_1.default[100],
        '&:hover': {
            backgroundColor: red_1.default[200],
        },
    },
}))(Button_1.default);
exports.IntoleranceButton = IntoleranceButton;
const IconButtonWithBackground = withStyles_1.default((theme) => ({
    root: {
        borderRadius: '0',
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
}))(IconButton_1.default);
exports.IconButtonWithBackground = IconButtonWithBackground;
