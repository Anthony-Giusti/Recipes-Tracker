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
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
const react_1 = __importStar(require("react"));
const react_router_1 = require("react-router");
const Search_1 = __importDefault(require("@material-ui/icons/Search"));
const InputBase_1 = __importDefault(require("@material-ui/core/InputBase"));
const Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
const Styles_1 = __importDefault(require("./Styles"));
const RecipeSearchBar = ({ handleSearch, isSearching, emptySearch, recipeSearchText, }) => {
    const classes = Styles_1.default();
    const location = react_router_1.useLocation();
    let searchField;
    const handleEmpty = () => {
        emptySearch();
        searchField.value = '';
    };
    const handleChange = (e) => {
        handleSearch(e.target.value);
    };
    react_1.useEffect(() => {
        if (location.pathname === '/' && !isSearching) {
            handleEmpty();
        }
    }, [location]);
    return (react_1.default.createElement("span", { className: classes.searchBar },
        react_1.default.createElement(Search_1.default, { className: classes.searchIcon }),
        react_1.default.createElement(InputBase_1.default, { className: classes.searchField, defaultValue: recipeSearchText, placeholder: "Search", onChange: handleChange, inputRef: (ref) => {
                searchField = ref;
            } }),
        isSearching && react_1.default.createElement(Clear_1.default, { className: classes.clearIcon, onClick: handleEmpty })));
};
exports.default = RecipeSearchBar;
