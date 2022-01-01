"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const react_1 = __importDefault(require("react"));
// eslint-disable-next-line import/no-named-as-default-member
const Styles_1 = __importDefault(require("./Styles"));
const URLImageField = ({ imageURL, imageURLError }) => {
    const classes = Styles_1.default();
    return (react_1.default.createElement(TextField_1.default, { className: classes.field, name: "imageURL", defaultValue: imageURL, label: "Image URL", variant: "outlined", color: "secondary", multiline: true, rows: 4, error: imageURLError, fullWidth: true }));
};
exports.default = URLImageField;
