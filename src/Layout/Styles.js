"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const makeStyles_1 = __importDefault(require("@material-ui/core/styles/makeStyles"));
exports.default = makeStyles_1.default((theme) => ({
    page: {
        background: '#f9f9f9',
        width: '100%',
    },
    title: {
        padding: theme.spacing(3),
    },
    root: {
        display: 'flex',
    },
    navBtn: {
        margin: '0.4em',
    },
    toolbar: theme.mixins.toolbar,
    divider: {
        backgroundColor: theme.palette.common.white,
        width: 2,
        height: '3em',
        margin: '0 0.8em',
    },
    avatarIconBtn: {
        marginLeft: 'auto',
        width: '2.5em',
    },
    drawer: {
        background: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
    },
    drawerFilterBtn: {
        flexGrow: 1,
    },
}));
