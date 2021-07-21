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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/prop-types */
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const FilterCheckBoxes = ({ filteredTags, tagGroup, option, handleFilter }) => {
    const [checked, setChecked] = react_1.useState(filteredTags[tagGroup].includes(option.value));
    const handleClick = () => {
        setChecked((prevState) => !prevState);
        handleFilter(option.value, tagGroup);
    };
    return (react_1.default.createElement(core_1.MenuItem, { key: option.value },
        react_1.default.createElement(core_1.FormControlLabel, { control: react_1.default.createElement(core_1.Checkbox, { name: option.label }), checked: checked, label: option.label, value: option.value, onChange: handleClick })));
};
exports.default = FilterCheckBoxes;
