"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = styles_1.makeStyles((theme) => ({
    searchBar: {
        width: '15em',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: styles_1.fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: styles_1.fade(theme.palette.common.white, 0.25),
        },
        margin: '0 0.9em 0 0.3em',
        [theme.breakpoints.down('sm')]: {
            flexBasis: '100%',
            margin: '1em 0',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
    },
    clearIcon: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: 'auto',
        },
    },
    searchField: {
        color: theme.palette.common.white,
        width: '100%',
    },
}));
