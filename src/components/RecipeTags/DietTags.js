"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
const react_1 = __importDefault(require("react"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Styles_1 = __importDefault(require("./Styles"));
const DietTags = ({ dietTags }) => {
    const classes = Styles_1.default();
    return (react_1.default.createElement(Grid_1.default, { container: true, direction: "row", spacing: 1 }, dietTags.formatted.map((dietTag) => (react_1.default.createElement(Grid_1.default, { item: true, key: dietTag },
        react_1.default.createElement("div", { className: classes.dietTag },
            react_1.default.createElement(Typography_1.default, { className: classes.tagText }, dietTag)))))));
};
exports.default = DietTags;
