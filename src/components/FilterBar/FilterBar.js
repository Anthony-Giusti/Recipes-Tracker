"use strict";
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
// @ts-nocheck
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
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const Styles_1 = __importDefault(require("./Styles"));
const FilterCheckBoxes_1 = __importDefault(require("../FilterCheckBoxes/FilterCheckBoxes"));
const FilterBar = ({ options, filterRecipes, filteredTags, tagTitle, tagGroup, }) => {
    const [filterMenuOpen, setFilterMenuOpen] = react_1.useState(null);
    const classes = Styles_1.default();
    const handleFilterMenuOpen = (e) => {
        setFilterMenuOpen(e.currentTarget);
    };
    const handleFilterMenuClose = () => {
        setFilterMenuOpen(null);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Button, { className: classes.navBtn, variant: "contained", onClick: handleFilterMenuOpen, color: filteredTags[tagGroup].length > 0 ? 'secondary' : 'default' },
            "Filter By ",
            tagTitle),
        react_1.default.createElement(core_1.Menu, { id: `filter-${tagGroup}-menu`, open: Boolean(filterMenuOpen), anchorEl: filterMenuOpen, onClose: handleFilterMenuClose }, options.map((option) => (react_1.default.createElement("div", { key: option.value },
            react_1.default.createElement(FilterCheckBoxes_1.default, { tagGroup: tagGroup, filteredTags: filteredTags, option: option, handleFilter: filterRecipes })))))));
};
exports.default = FilterBar;
