"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const grey_1 = __importDefault(require("@material-ui/core/colors/grey"));
exports.default = core_1.makeStyles((theme) => ({
    section: {
        margin: '1em 0',
        padding: '1em',
    },
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block',
    },
    yieldCookTimeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    secondaryTitle: {
        background: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        padding: '5px 20px',
        borderRadius: '1em',
    },
    yieldCookTime: {
        display: 'flex',
        marginRight: '1em',
    },
    yieldCookTimeTitle: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '1em',
    },
    removeImageURLbtn: {
        borderRadius: '0',
        '&:hover': {
            color: 'white',
            background: theme.palette.error.main,
        },
    },
    ingredientSearchField: {
        maxWidth: 200,
    },
    searchResultsItem: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0.3em',
    },
    ingredientSearchBtn: {
        '&:hover': {
            backgroundColor: 'red',
        },
    },
    formControl: {
        display: 'flex',
        flexDirection: 'row',
    },
    checkBoxGroup: {
        background: grey_1.default[200],
        padding: 10,
        margin: 5,
        borderRadius: 25,
    },
    checkBoxLabel: {
        textAlign: 'center',
    },
    checkBoxOptions: {
        flexDirection: 'row',
    },
    addImageURLBtn: {
        borderRadius: '0',
    },
}));
