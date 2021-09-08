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
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
// @ts-nocheck
const react_1 = __importStar(require("react"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Select_1 = __importDefault(require("@material-ui/core/Select"));
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const Menu_1 = __importDefault(require("@material-ui/core/Menu"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const Menu_2 = __importDefault(require("@material-ui/icons/Menu"));
const IconButtons_1 = require("../../../../Themes/Buttons/IconButtons/IconButtons");
const Styles_1 = __importDefault(require("./Styles"));
const Ingredient = ({ ingredient, removeIngredient, changeIngredientValue, handleCustomUnit, }) => {
    const classes = Styles_1.default();
    const [defaultUnit] = react_1.useState(ingredient.unit);
    const [units] = react_1.useState(ingredient.units);
    const [editingComment, setEditingComment] = react_1.useState(false);
    const [commentAdded, setCommentAdded] = react_1.useState(!!ingredient.comment);
    const [quantityError, setQuantityError] = react_1.useState(false);
    const [ingMenuAnchor, setIngMenuAnchor] = react_1.useState(null);
    const [commentMenuAnchor, setCommentMenuAnchor] = react_1.useState(null);
    const [customUnitMenuOpen, setCustomUnitMeuOpen] = react_1.useState(false);
    const [customUnit, setCustomUnit] = react_1.useState(ingredient.customUnit);
    const [customUnitAdded, setCustomUnitAdded] = react_1.useState(ingredient.customUnitAdded);
    let commentField;
    let quantityField;
    let customUnitField;
    const addComment = (comment) => {
        if (comment === '') {
            setEditingComment(false);
            return;
        }
        changeIngredientValue(ingredient.id, 'comment', comment);
        setEditingComment(false);
        setCommentAdded(true);
    };
    const deleteComment = () => {
        changeIngredientValue(ingredient.id, 'comment', null);
        setCommentAdded(false);
    };
    const handleUnitChange = (value) => {
        changeIngredientValue(ingredient.id, 'unit', value);
    };
    const handleQunatityChange = (value) => {
        if (value < 0 || value > 9999) {
            quantityField.value = 1;
        }
        else {
            setQuantityError(false);
            changeIngredientValue(ingredient.id, 'quantity', value);
        }
    };
    const handleCommentMenuOpen = (event) => {
        setCommentMenuAnchor(event.currentTarget);
    };
    const handleIngMenuOpen = (event) => {
        setIngMenuAnchor(event.currentTarget);
    };
    const handleMenuClose = (anchor) => {
        anchor(null);
    };
    const handleAddCustomUnit = () => {
        setCustomUnitMeuOpen(false);
        handleCustomUnit(ingredient.id, true, customUnitField.value);
        setCustomUnitAdded(true);
        setCustomUnit(customUnitField.value);
    };
    const handleRemoveCustomUnit = () => {
        setCustomUnitMeuOpen(false);
        handleCustomUnit(ingredient.id, false, ingredient.units[0]);
        setCustomUnitAdded(false);
        setCustomUnit('');
    };
    return (react_1.default.createElement(Card_1.default, { raised: true, className: classes.ingredient },
        react_1.default.createElement(Container_1.default, { className: classes.ingredientUpper },
            react_1.default.createElement("div", { className: classes.titleContainer },
                react_1.default.createElement(Typography_1.default, { variant: "h6", className: classes.title }, ingredient.name)),
            react_1.default.createElement(FormControl_1.default, { className: classes.option },
                react_1.default.createElement(TextField_1.default, { label: "Quantity", color: "secondary", type: "number", defaultValue: ingredient.quantity ? ingredient.quantity : 1, inputProps: { min: 0, max: 9999 }, InputLabelProps: {
                        shrink: true,
                    }, inputRef: (ref) => {
                        quantityField = ref;
                    }, variant: "outlined", error: quantityError, onChange: (e) => handleQunatityChange(parseFloat(e.target.value)) })),
            react_1.default.createElement(FormControl_1.default, { className: classes.unit }, customUnitAdded ? (react_1.default.createElement("div", { className: classes.customUnit },
                react_1.default.createElement(Typography_1.default, { className: classes.customUnitText }, customUnit),
                react_1.default.createElement(Typography_1.default, { className: classes.customUnitLabel }, "(Custom Unit)"))) : (react_1.default.createElement(Select_1.default, { variant: "outlined", color: "secondary", defaultValue: defaultUnit, onChange: (e) => handleUnitChange(e.target.value) }, units.map((unit) => (react_1.default.createElement(MenuItem_1.default, { value: unit, key: `${ingredient}-${unit}` }, unit)))))),
            react_1.default.createElement(IconButtons_1.IconButtonWithBackground, { "aria-controls": "simple-menu", "aria-haspopup": "true", onClick: handleIngMenuOpen },
                react_1.default.createElement(Menu_2.default, null))),
        react_1.default.createElement(Menu_1.default, { id: "ingredient-options", anchorEl: ingMenuAnchor, keepMounted: true, open: Boolean(ingMenuAnchor), onClose: () => handleMenuClose(setIngMenuAnchor) },
            customUnitAdded ? (react_1.default.createElement(MenuItem_1.default, { onClick: () => {
                    handleMenuClose(setIngMenuAnchor);
                    handleRemoveCustomUnit();
                } }, "Remove Custom Unit")) : (react_1.default.createElement(MenuItem_1.default, { onClick: () => {
                    handleMenuClose(setIngMenuAnchor);
                    setCustomUnitMeuOpen(true);
                } }, "Add Custom Unit")),
            react_1.default.createElement(MenuItem_1.default, { onClick: () => removeIngredient(ingredient) }, "Delete This Ingredient")),
        react_1.default.createElement(Divider_1.default, null),
        react_1.default.createElement(Container_1.default, { className: classes.comment },
            editingComment ? (react_1.default.createElement("div", { className: classes.commentEdit },
                react_1.default.createElement(IconButtons_1.IconButtonWithBackground, { onClick: () => addComment(commentField.value) },
                    react_1.default.createElement(Add_1.default, null)),
                react_1.default.createElement(TextField_1.default, { defaultValue: ingredient.comment, className: classes.commentTextField, id: `${ingredient.name}-comment`, label: commentAdded ? 'Edit Comment' : 'Add Comment', variant: "filled", inputRef: (ref) => {
                        commentField = ref;
                    }, inputProps: { maxLength: 75 } }))) : (react_1.default.createElement("div", { className: classes.commentDisplayed }, commentAdded ? (react_1.default.createElement(IconButtons_1.IconButtonWithBackground, { className: classes.editCommentBtn, onClick: handleCommentMenuOpen },
                react_1.default.createElement(Menu_2.default, null))) : (react_1.default.createElement(Button_1.default, { color: "primary", variant: "contained", onClick: () => setEditingComment(true) }, "Add Comment")))),
            !editingComment && ingredient.comment && (react_1.default.createElement("div", { className: classes.commentDisplay },
                react_1.default.createElement(Typography_1.default, { className: classes.commentText }, `(${ingredient.comment})`))),
            react_1.default.createElement(Menu_1.default, { id: "simple-menu", anchorEl: commentMenuAnchor, keepMounted: true, open: Boolean(commentMenuAnchor), onClose: () => handleMenuClose(setCommentMenuAnchor) },
                react_1.default.createElement(MenuItem_1.default, { onClick: () => {
                        handleMenuClose(setCommentMenuAnchor);
                        deleteComment();
                    } }, "Delete Comment"),
                react_1.default.createElement(MenuItem_1.default, { onClick: () => {
                        handleMenuClose(setCommentMenuAnchor);
                        setEditingComment(true);
                    } }, "Edit Comment"))),
        react_1.default.createElement(Dialog_1.default, { open: customUnitMenuOpen, onClose: () => setCustomUnitMeuOpen(false), "aria-labelledby": "form-dialog-title" },
            react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "Add Custom Unit"),
            react_1.default.createElement(DialogContent_1.default, null,
                react_1.default.createElement(TextField_1.default, { autoFocus: true, margin: "dense", id: "custom unit", type: "custom unit", fullWidth: true, inputRef: (ref) => {
                        customUnitField = ref;
                    } })),
            react_1.default.createElement(DialogActions_1.default, null,
                react_1.default.createElement(Button_1.default, { onClick: () => setCustomUnitMeuOpen(false), color: "primary" }, "Cancel"),
                react_1.default.createElement(Button_1.default, { onClick: handleAddCustomUnit, color: "primary" }, "Add Unit")))));
};
exports.default = Ingredient;
