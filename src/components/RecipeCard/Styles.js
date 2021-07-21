"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const colors_1 = require("@material-ui/core/colors");
exports.default = core_1.makeStyles({
    image: {
        width: '100%',
        height: '15em',
        objectFit: 'cover',
    },
    catergoryTag: {
        backgroundColor: colors_1.cyan[100],
        borderRadius: '1em',
    },
    dietTag: {
        backgroundColor: colors_1.green[100],
        borderRadius: '1em',
    },
    intolerancesTitle: {
        display: 'flex',
        alignItems: 'center',
    },
    intoleranceTag: {
        backgroundColor: colors_1.red[100],
        borderRadius: '1em',
    },
    tagText: {
        padding: '0.4em',
    },
    details: {
        margin: '1em 0',
    },
    intolerances: {
        margin: '0',
    },
});
