"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
const react_1 = __importDefault(require("react"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const RecipeForm_1 = __importDefault(require("../../components/RecipeForm/RecipeForm"));
const Pages_1 = __importDefault(require("../../Themes/Pages/Pages"));
const Edit = ({ currentRecipe, editRecipe, api }) => {
    const submit = (recipe) => {
        editRecipe(recipe);
    };
    return currentRecipe ? (react_1.default.createElement(Pages_1.default, null,
        react_1.default.createElement(Typography_1.default, { variant: "h2" }, "Edit Recipe"),
        react_1.default.createElement(RecipeForm_1.default, { recipe: currentRecipe, submit: submit, submitBtnText: "Confirm Edit", api: api }))) : ('Select a recipe first in order to Edit');
};
exports.default = Edit;
