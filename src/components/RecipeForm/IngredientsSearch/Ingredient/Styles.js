"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const core_1 = require("@material-ui/core");
exports.default = core_1.makeStyles((theme) => ({
    ingredient: {
        margin: '0.3em 0',
    },
    ingredientUpper: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            flexWrap: 'wrap',
        },
    },
    option: {
        marginTop: 10,
        marginBottom: 10,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexBasis: '30%',
        padding: 10,
        [theme.breakpoints.down('xs')]: {
            flexBasis: '100%',
        },
    },
    unit: {
        flexBasis: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            flexGrow: '1',
        },
    },
    customUnit: {
        position: 'relative',
        borderRadius: 4,
        border: '1px solid rgba(0, 0, 0, 0.23)',
        height: '3.4em',
        display: 'flex',
        paddingLeft: '0.7em',
        alignItems: 'center',
    },
    customUnitText: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    customUnitLabel: {
        position: 'absolute',
        top: '-0.73em',
        left: '0.6em',
        background: 'white',
        fontSize: '0.75em',
        color: 'rgba(0, 0, 0, 0.5)',
        padding: '0 0.3em',
        [theme.breakpoints.down('xs')]: {
            left: '0.1em',
            padding: 0,
        },
    },
    comment: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '3em',
    },
    commentText: {
        display: '-webkit-box',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        '-webkitLineClamp': 2,
        '-webkitBoxOrient': 'vertical',
    },
    editCommentBtn: {
        padding: 7,
    },
    commentDisplayed: {
        display: 'flex',
        alignItems: 'center',
    },
    commentEdit: {
        display: 'flex',
        width: '100%',
    },
    commentDisplay: {
        flexGrow: '1',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1em',
    },
    commentTextField: {
        flexGrow: 1,
        height: '100%',
    },
}));
