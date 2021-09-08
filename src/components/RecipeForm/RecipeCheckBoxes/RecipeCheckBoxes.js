"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
const react_1 = __importDefault(require("react"));
const Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
const FormGroup_1 = __importDefault(require("@material-ui/core/FormGroup"));
const FormHelperText_1 = __importDefault(require("@material-ui/core/FormHelperText"));
const FormLabel_1 = __importDefault(require("@material-ui/core/FormLabel"));
const Styles_1 = __importDefault(require("./Styles"));
const _recipeTagOptions_1 = require("../../../data/_recipeTagOptions");
const RecipeCheckBoxes = ({ categoryError, handleCheckBoxValueChange, categories, dietTags, intolerances, }) => {
    const classes = Styles_1.default();
    return (react_1.default.createElement(FormControl_1.default, { component: "fieldset", className: classes.formControl },
        react_1.default.createElement(FormControl_1.default, { className: classes.checkBoxGroup, error: categoryError },
            react_1.default.createElement(FormLabel_1.default, { className: classes.checkBoxLabel, required: true, component: "legend" }, "Category"),
            react_1.default.createElement(FormGroup_1.default, { className: classes.checkBoxOptions, onChange: (e) => handleCheckBoxValueChange(e.target.value, 'categories') }, _recipeTagOptions_1.categoryOptions.map((option) => (react_1.default.createElement(FormControlLabel_1.default, { key: option.value, control: react_1.default.createElement(Checkbox_1.default, { name: option.value }), checked: categories.includes(option.value), label: option.label, value: option.value })))),
            categoryError && react_1.default.createElement(FormHelperText_1.default, null, "You must select at least one")),
        react_1.default.createElement(Container_1.default, { className: classes.checkBoxGroup },
            react_1.default.createElement(FormLabel_1.default, { className: classes.checkBoxLabel, component: "legend" }, "Diet Tags"),
            react_1.default.createElement(FormGroup_1.default, { className: classes.checkBoxOptions, onChange: (e) => handleCheckBoxValueChange(e.target.value, 'dietTags') }, _recipeTagOptions_1.dietTagOptions.map((option) => (react_1.default.createElement(FormControlLabel_1.default, { key: option.value, control: react_1.default.createElement(Checkbox_1.default, { name: option.value }), checked: dietTags.includes(option.value), label: option.label, value: option.value }))))),
        react_1.default.createElement(Container_1.default, { className: classes.checkBoxGroup },
            react_1.default.createElement(FormLabel_1.default, { className: classes.checkBoxLabel, component: "legend" }, "Intolerances"),
            react_1.default.createElement(FormGroup_1.default, { className: classes.checkBoxOptions, onChange: (e) => handleCheckBoxValueChange(e.target.value, 'intolerances') }, _recipeTagOptions_1.intoleranceOptions.map((option) => (react_1.default.createElement(FormControlLabel_1.default, { key: option.value, control: react_1.default.createElement(Checkbox_1.default, { name: option.value }), checked: intolerances.includes(option.value), label: option.label, value: option.value })))))));
};
exports.default = RecipeCheckBoxes;
