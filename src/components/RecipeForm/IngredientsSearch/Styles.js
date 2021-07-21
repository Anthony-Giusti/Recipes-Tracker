"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
exports.default = core_1.makeStyles({
    searchBar: {
        display: 'flex',
        marginBottom: '1em',
    },
    progress: {
        display: 'flex',
        alignItems: 'center',
    },
    searchResults: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 0,
    },
    searchResultsItem: {
        margin: '0.5em 1em 0.5em 0',
    },
});
