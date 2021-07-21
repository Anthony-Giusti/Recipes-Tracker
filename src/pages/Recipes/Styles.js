"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const colors_1 = require("@material-ui/core/colors");
exports.default = core_1.makeStyles({
    container: {
        maxWidth: 1400,
        margin: ' 0 auto',
        paddingBottom: '1em',
    },
    searchingSpinner: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        background: 'rgba(100, 100, 100, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '200',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    filterTags: {
        marginTop: '1em',
        marginBottom: '2em',
    },
    myMasonryGrid: {
        display: 'flex',
        marginLeft: 0,
        width: 'auto',
    },
    myMasonryGridColumn: {
        paddingLeft: 10,
        backgroundClip: 'padding-box',
    },
    masonryGridItem: {
        backgroundColor: colors_1.grey,
        marginBottom: 30,
    },
    loadMoreBtnContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
});
