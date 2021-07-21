"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/prop-types */
const react_1 = __importDefault(require("react"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Styles_1 = __importDefault(require("./Styles"));
const TagButtons_1 = require("../../Themes/Buttons/TagButtons/TagButtons");
const FilterTagsDisplay = ({ filteredTags, filterTags, formatName, resetFilterTags, }) => {
    const classes = Styles_1.default();
    const handleClick = (tag, category) => {
        filterTags(tag, category);
    };
    return (react_1.default.createElement("div", { className: classes.container },
        filteredTags.categories.length >= 1 && (react_1.default.createElement(Grid_1.default, { className: classes.gridContainer, container: true, spacing: 1 }, filteredTags.categories.map((tag) => (react_1.default.createElement(Grid_1.default, { item: true, key: tag },
            react_1.default.createElement(TagButtons_1.CategoryButton, { variant: "contained", 
                // className={classes.categoryBtn}
                onClick: () => handleClick(tag, 'categories') }, formatName(tag))))))),
        filteredTags.dietTags.length >= 1 && (react_1.default.createElement(Grid_1.default, { className: classes.gridContainer, container: true, spacing: 1 }, filteredTags.dietTags.map((tag) => (react_1.default.createElement(Grid_1.default, { item: true, key: tag },
            react_1.default.createElement(TagButtons_1.DietButton, { variant: "contained", 
                // className={classes.dietBtn}
                onClick: () => handleClick(tag, 'dietTags') }, formatName(tag))))))),
        filteredTags.intolerances.length >= 1 && (react_1.default.createElement(Grid_1.default, { className: classes.gridContainer, container: true, spacing: 1 }, filteredTags.intolerances.map((tag) => (react_1.default.createElement(Grid_1.default, { item: true, key: tag },
            react_1.default.createElement(TagButtons_1.IntoleranceButton, { variant: "contained", 
                // className={classes.intoleranceBtn}
                onClick: () => handleClick(tag, 'intolerances') }, formatName(tag))))))),
        (filteredTags.categories.length >= 1 ||
            filteredTags.dietTags.length >= 1 ||
            filteredTags.intolerances.length >= 1) && (react_1.default.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: resetFilterTags, className: classes.resetBtn }, "Reset Tags"))));
};
exports.default = FilterTagsDisplay;
