"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
const react_1 = __importDefault(require("react"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardHeader_1 = __importDefault(require("@material-ui/core/CardHeader"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const DeleteOutlined_1 = __importDefault(require("@material-ui/icons/DeleteOutlined"));
const ZoomOutMap_1 = __importDefault(require("@material-ui/icons/ZoomOutMap"));
const react_material_ui_carousel_1 = __importDefault(require("react-material-ui-carousel"));
const core_1 = require("@material-ui/core");
const Styles_1 = __importDefault(require("./Styles"));
const RecipeCard = ({ recipe, handleModalOpen, handleDeleteOpen }) => {
    const classes = Styles_1.default();
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Card_1.default, { elevation: 1 },
            react_1.default.createElement(CardHeader_1.default, { title: recipe.title }),
            recipe.imageURLs.length === 1 && (react_1.default.createElement(CardMedia_1.default, { component: "img", className: classes.image, image: recipe.imageURLs[0] })),
            recipe.imageURLs.length > 1 && (react_1.default.createElement(react_material_ui_carousel_1.default, { autoPlay: false, timeout: 300 }, recipe.imageURLs.map((url, index) => (react_1.default.createElement("img", { alt: "of", key: index, className: classes.image, src: url }))))),
            react_1.default.createElement(CardContent_1.default, null,
                react_1.default.createElement(Grid_1.default, { container: true, direction: "row", spacing: 1 }, recipe.categories.formatted.map((category) => (react_1.default.createElement(Grid_1.default, { item: true, key: category },
                    react_1.default.createElement("div", { className: classes.catergoryTag },
                        react_1.default.createElement(Typography_1.default, { className: classes.tagText }, category)))))),
                react_1.default.createElement(Grid_1.default, { container: true, direction: "row", spacing: 1 }, recipe.dietTags.formatted.map((dietTag) => (react_1.default.createElement(Grid_1.default, { item: true, key: dietTag },
                    react_1.default.createElement("div", { className: classes.dietTag },
                        react_1.default.createElement(Typography_1.default, { className: classes.tagText }, dietTag)))))),
                react_1.default.createElement(Typography_1.default, { className: classes.details, variant: "body2", color: "textSecondary" }, recipe.details),
                (recipe.cookTime.hours > 0 || recipe.cookTime.minutes > 0) && (react_1.default.createElement(Typography_1.default, null,
                    "Cook Time: ",
                    recipe.cookTime.formatted)),
                recipe.intolerances.formatted.length >= 1 && (react_1.default.createElement(Grid_1.default, { className: classes.intolerances, container: true, direction: "row", spacing: 1 },
                    react_1.default.createElement("div", { className: classes.intolerancesTitle },
                        react_1.default.createElement(Typography_1.default, { align: "center" }, "Contains:")),
                    recipe.intolerances.formatted.map((intolerance) => (react_1.default.createElement(Grid_1.default, { item: true, key: intolerance },
                        react_1.default.createElement("div", { className: classes.intoleranceTag },
                            react_1.default.createElement(Typography_1.default, { className: classes.tagText }, intolerance)))))))),
            react_1.default.createElement(Divider_1.default, null),
            react_1.default.createElement(core_1.CardActions, null,
                react_1.default.createElement(IconButton_1.default, { onClick: () => handleModalOpen(recipe.id) },
                    react_1.default.createElement(ZoomOutMap_1.default, null)),
                react_1.default.createElement(IconButton_1.default, { "aria-label": "settings", onClick: () => handleDeleteOpen(recipe.id) },
                    react_1.default.createElement(DeleteOutlined_1.default, null))))));
};
exports.default = RecipeCard;
