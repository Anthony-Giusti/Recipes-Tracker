"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const core_1 = require("@material-ui/core");
const colors_1 = require("@material-ui/core/colors");
const Theme = core_1.createMuiTheme({
    palette: {
        primary: {
            main: colors_1.blueGrey[700],
        },
        secondary: {
            main: colors_1.red[900],
        },
        selected: {
            main: '#81c784',
        },
        default: {
            main: colors_1.grey[300],
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});
exports.default = Theme;
