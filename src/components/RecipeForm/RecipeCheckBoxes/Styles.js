"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const colors_1 = require("@material-ui/core/colors");
exports.default = core_1.makeStyles({
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkBoxGroup: {
        flexBasis: '20em',
        // flexGrow: '1',
        background: colors_1.grey[200],
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
});
