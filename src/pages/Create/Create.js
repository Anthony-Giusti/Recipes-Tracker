"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
const react_1 = __importDefault(require("react"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const RecipeForm_1 = __importDefault(require("../../components/RecipeForm/RecipeForm"));
const Pages_1 = __importDefault(require("../../Themes/Pages/Pages"));
const Create = ({ addRecipe, api }) => {
    const submit = (recipe) => {
        addRecipe(recipe);
    };
    return (react_1.default.createElement(Pages_1.default, null,
        react_1.default.createElement(Typography_1.default, { variant: "h2" }, "Create New Recipe"),
        react_1.default.createElement(RecipeForm_1.default, { recipe: null, submit: submit, submitBtnText: "Add Recipe", api: api })));
};
exports.default = Create;
