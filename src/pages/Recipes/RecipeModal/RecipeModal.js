"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/prop-types */
const react_1 = __importDefault(require("react"));
const useMediaQuery_1 = __importDefault(require("@material-ui/core/useMediaQuery"));
const styles_1 = require("@material-ui/core/styles");
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const List_1 = __importDefault(require("@material-ui/core/List"));
const ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
const ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
const Modal_1 = __importDefault(require("@material-ui/core/Modal"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Edit_1 = __importDefault(require("@material-ui/icons/Edit"));
const FullscreenExit_1 = __importDefault(require("@material-ui/icons/FullscreenExit"));
const Print_1 = __importDefault(require("@material-ui/icons/Print"));
const core_1 = require("@material-ui/core");
const CategoryTags_1 = __importDefault(require("../../../components/RecipeTags/CategoryTags"));
const DietTags_1 = __importDefault(require("../../../components/RecipeTags/DietTags"));
const IntoleranceTags_1 = __importDefault(require("../../../components/RecipeTags/IntoleranceTags"));
const Styles_1 = __importDefault(require("./Styles"));
const IconButtons_1 = require("../../../Themes/Buttons/IconButtons/IconButtons");
const RecipeModal = ({ modalOpen, modalClose, recipe, handleCurrentRecipe, printRecipe, }) => {
    const classes = Styles_1.default();
    const theme = styles_1.useTheme();
    const smDevice = useMediaQuery_1.default(theme.breakpoints.up('sm'));
    const enterEditingMode = () => {
        handleCurrentRecipe(recipe);
    };
    return (react_1.default.createElement(Modal_1.default, { ref: react_1.default.createRef(), 
        // ref={React.createRef(recipe)}
        open: modalOpen, onClose: modalClose, className: classes.recipeModal },
        react_1.default.createElement(Paper_1.default, { className: classes.recipePaper },
            react_1.default.createElement(AppBar_1.default, { className: classes.appbar, position: "fixed" },
                react_1.default.createElement(Toolbar_1.default, { className: classes.toolbar },
                    react_1.default.createElement("span", null, smDevice ? (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(Button_1.default, { className: classes.moduleNavBtn, variant: "contained", endIcon: react_1.default.createElement(Edit_1.default, null), onClick: () => enterEditingMode() }, "Edit Recipe"),
                        react_1.default.createElement(Button_1.default, { className: classes.moduleNavBtn, variant: "contained", endIcon: react_1.default.createElement(Print_1.default, null), onClick: () => printRecipe('recipe-print') }, "Print Recipe"))) : (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(IconButtons_1.IconButtonWithBackgroundDefault, { className: classes.moduleNavBtn, onClick: () => enterEditingMode() },
                            react_1.default.createElement(Edit_1.default, null)),
                        react_1.default.createElement(IconButtons_1.IconButtonWithBackgroundDefault, { className: classes.moduleNavBtn, onClick: () => printRecipe('recipe-print') },
                            react_1.default.createElement(Print_1.default, null))))),
                    react_1.default.createElement(IconButton_1.default, { className: classes.exitBtn, onClick: modalClose },
                        react_1.default.createElement(FullscreenExit_1.default, { fontSize: "large" })))),
            react_1.default.createElement("div", { id: "recipe-print" },
                react_1.default.createElement("div", { className: classes.modalBody },
                    react_1.default.createElement(Typography_1.default, { variant: "h2", gutterBottom: true }, recipe.title),
                    react_1.default.createElement(Typography_1.default, { variant: "body1", paragraph: true }, recipe.details),
                    react_1.default.createElement("div", { className: classes.tags },
                        react_1.default.createElement(CategoryTags_1.default, { catergories: recipe.categories }),
                        react_1.default.createElement(DietTags_1.default, { dietTags: recipe.dietTags }),
                        recipe.intolerances.formatted.length > 0 && (react_1.default.createElement("span", { className: classes.intolerances },
                            react_1.default.createElement(Typography_1.default, { variant: "subtitle1", className: classes.intolerancesSubtitle },
                                "Contains:",
                                ' '),
                            react_1.default.createElement(IntoleranceTags_1.default, { intoleranceTags: recipe.intolerances })))),
                    react_1.default.createElement(core_1.Grid, { container: true, spacing: 1, direction: smDevice ? 'row' : 'column', className: classes.timeAndServings },
                        react_1.default.createElement(core_1.Grid, { item: true },
                            react_1.default.createElement(Typography_1.default, { variant: "subtitle1", className: classes.subtitle }, `Total Cook Time: ${recipe.cookTime.formatted}`)),
                        react_1.default.createElement(core_1.Grid, { item: true },
                            react_1.default.createElement(core_1.Divider, { orientation: smDevice ? 'vertical' : 'horizontal' })),
                        react_1.default.createElement(core_1.Grid, { item: true },
                            react_1.default.createElement(Typography_1.default, { variant: "subtitle1", className: classes.subtitle }, `Servings: ${recipe.servings}`))),
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(Typography_1.default, { className: classes.secondaryTitle, variant: "h4" }, "Ingredients"),
                        react_1.default.createElement(List_1.default, null, recipe.ingredients.map((ingredient) => (react_1.default.createElement(ListItem_1.default, { divider: true, key: ingredient.id },
                            react_1.default.createElement(ListItemText_1.default, null,
                                ingredient.name,
                                " - ",
                                ingredient.quantity,
                                ' ',
                                ingredient.customUnitAdded ? ingredient.customUnit : ingredient.unit,
                                ' ',
                                ingredient.comment && `(${ingredient.comment})`)))))),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(Typography_1.default, { className: classes.secondaryTitle, variant: "h4" }, "Instructions"),
                        react_1.default.createElement(List_1.default, null, recipe.steps.map((step) => (react_1.default.createElement(ListItem_1.default, { divider: step.order !== recipe.steps.length, key: step.id, className: classes.stepItem },
                            react_1.default.createElement("div", { className: classes.stepOrderContainer },
                                react_1.default.createElement(Typography_1.default, { className: classes.stepOrder }, step.order)),
                            react_1.default.createElement("div", { className: classes.stepTextContainer },
                                react_1.default.createElement(ListItemText_1.default, null, step.step))))))),
                    recipe.additionalNotes.length > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(Typography_1.default, { className: classes.secondaryTitle, variant: "h4" }, "Additional Notes"),
                        recipe.additionalNotes.map((note) => (react_1.default.createElement(ListItem_1.default, { divider: note.order !== recipe.additionalNotes.length, key: note.id, className: classes.stepItem },
                            react_1.default.createElement("div", { className: classes.stepTextContainer },
                                react_1.default.createElement(ListItemText_1.default, null, note.step))))))))))));
};
exports.default = RecipeModal;
