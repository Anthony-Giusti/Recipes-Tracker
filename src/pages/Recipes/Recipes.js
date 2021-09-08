"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
// @ts-nocheck
const react_1 = __importStar(require("react"));
const react_masonry_css_1 = __importDefault(require("react-masonry-css"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const Drawer_1 = __importDefault(require("@material-ui/core/Drawer"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const Pages_1 = __importDefault(require("../../Themes/Pages/Pages"));
const RecipeCard_js_1 = __importDefault(require("../../components/RecipeCard/RecipeCard.js"));
const RecipeModal_1 = __importDefault(require("./RecipeModal/RecipeModal"));
const RecipeForm_1 = __importDefault(require("../../components/RecipeForm/RecipeForm"));
const FilterTagsDisplay_1 = __importDefault(require("../../components/FilterTagsDisplay/FilterTagsDisplay"));
const Styles_1 = __importDefault(require("./Styles"));
const Recipes = ({ visibleRecipes, resetFilterTags, deleteRecipe, getIngredientObject, handleCheckBoxValueChange, handleCurrentRecipe, fetchRecipes, isFetchingRecipes, filteredTags, filterTags, formatName, printRecipe, showMoreRecipes, maxRecipes, emptySearch, }) => {
    const [displayedRecipe, setDisplayedRecipe] = react_1.useState();
    const [deleteDialogOpen, setDeleteDialogOpen] = react_1.useState(false);
    const [deleteId, setDeleteId] = react_1.useState(null);
    const [modalOpen, setModalOpen] = react_1.useState(false);
    const classes = Styles_1.default();
    react_1.useEffect(() => {
        resetFilterTags();
        emptySearch();
        fetchRecipes();
    }, []);
    const handleDelete = () => {
        if (typeof deleteId === 'string') {
            deleteRecipe(deleteId);
            setDeleteDialogOpen(false);
        }
    };
    const handleDeleteOpen = (id) => {
        setDeleteDialogOpen(true);
        setDeleteId(id);
    };
    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setDeleteId(null);
    };
    const handleModalOpen = (recipeId) => {
        setDisplayedRecipe(visibleRecipes.find((recipe) => recipe.id === recipeId));
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const handleMoreRecipes = () => {
        showMoreRecipes(maxRecipes + 9);
    };
    const breakPoints = {
        default: 3,
        1100: 2,
        800: 1,
    };
    return (react_1.default.createElement(Pages_1.default, { className: classes.container },
        react_1.default.createElement(FilterTagsDisplay_1.default, { className: classes.filterTags, formatName: formatName, filterTags: filterTags, filteredTags: filteredTags, resetFilterTags: resetFilterTags }),
        isFetchingRecipes && (react_1.default.createElement("div", { className: classes.searchingSpinner },
            react_1.default.createElement(CircularProgress_1.default, { color: "primary", size: "5em" }))),
        react_1.default.createElement(react_masonry_css_1.default, { breakpointCols: breakPoints, className: classes.myMasonryGrid, columnClassName: classes.myMasonryGridColumn }, visibleRecipes &&
            visibleRecipes.slice(0, maxRecipes).map((recipe) => (react_1.default.createElement("div", { className: classes.masonryGridItem, key: recipe.id },
                react_1.default.createElement(RecipeCard_js_1.default, { handleDeleteOpen: handleDeleteOpen, handleModalOpen: handleModalOpen, recipe: recipe, handleDelete: handleDelete }))))),
        maxRecipes < visibleRecipes.length && (react_1.default.createElement("div", { className: classes.loadMoreBtnContainer },
            react_1.default.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: handleMoreRecipes }, "Load More"))),
        visibleRecipes.length === 0 && !isFetchingRecipes && (react_1.default.createElement(Typography_1.default, null, "No Recipes Found")),
        modalOpen && (react_1.default.createElement(RecipeModal_1.default, { getIngredientObject: getIngredientObject, modalOpen: modalOpen, modalClose: handleModalClose, recipe: displayedRecipe, handleCheckBoxValueChange: handleCheckBoxValueChange, handleCurrentRecipe: handleCurrentRecipe, printRecipe: printRecipe },
            react_1.default.createElement(RecipeForm_1.default, null))),
        react_1.default.createElement(Dialog_1.default, { open: deleteDialogOpen, onClose: handleDeleteClose, "aria-labelledby": "delete-dialog", "aria-describedby": "delete-recipe" },
            react_1.default.createElement(DialogTitle_1.default, { id: "alert-dialog-title" }, "Permanently delete this recipe?"),
            react_1.default.createElement(DialogActions_1.default, null,
                react_1.default.createElement(Button_1.default, { onClick: handleDeleteClose, color: "primary" }, "No"),
                react_1.default.createElement(Button_1.default, { onClick: handleDelete, color: "primary", autoFocus: true }, "Yes"))),
        react_1.default.createElement(Drawer_1.default, null)));
};
exports.default = Recipes;
