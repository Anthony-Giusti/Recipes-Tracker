"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const FormHelperText_1 = __importDefault(require("@material-ui/core/FormHelperText"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const IconButtons_1 = require("../../../Themes/Buttons/IconButtons/IconButtons");
const Styles_1 = __importDefault(require("./Styles"));
const Step_1 = __importDefault(require("./Step/Step"));
const Steps = ({ stepType, handleStepsChange, steps, stepsError }) => {
    let newStepField;
    const classes = Styles_1.default();
    const addNewStep = (newStep) => {
        if (!newStep) {
            return;
        }
        handleStepsChange([
            ...steps,
            {
                id: steps.length === 0 ? 1 : Math.max(...steps.map((step) => step.id)) + 1,
                order: steps.length === 0 ? 1 : steps.length + 1,
                step: newStep,
            },
        ]);
        newStepField.value = '';
    };
    const editStep = (stepId, stepOrder, step) => {
        const newSteps = steps.filter((step) => step.id !== stepId);
        newSteps.push({ id: stepId, order: stepOrder, step });
        newSteps.sort((a, b) => a.order - b.order);
        handleStepsChange(newSteps);
    };
    const moveStepOrderUp = (step) => {
        if (step.order === 1) {
            return;
        }
        const moveDown = steps[step.order - 2];
        const newSteps = steps.filter((element) => element.id !== step.id && element.id !== moveDown.id);
        step.order -= 1;
        moveDown.order += 1;
        newSteps.push(moveDown, step);
        newSteps.sort((a, b) => a.order - b.order);
        handleStepsChange(newSteps);
    };
    const moveStepOrderDown = (step) => {
        if (step.order === steps.length) {
            return;
        }
        const moveUp = steps[step.order];
        const newSteps = steps.filter((element) => element.id !== step.id && element.id !== moveUp.id);
        step.order += 1;
        moveUp.order -= 1;
        newSteps.push(moveUp, step);
        newSteps.sort((a, b) => a.order - b.order);
        handleStepsChange(newSteps);
    };
    const deleteStep = (step) => {
        const newSteps = steps.filter((element) => element.id !== step.id);
        for (let i = 0; i < newSteps.length; i += 1) {
            newSteps[i].order = i + 1;
        }
        handleStepsChange(newSteps);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null, steps.map((step) => (react_1.default.createElement(Step_1.default, { step: step, key: step.id, editStep: editStep, moveStepOrderUp: moveStepOrderUp, moveStepOrderDown: moveStepOrderDown, deleteStep: deleteStep })))),
        react_1.default.createElement(FormControl_1.default, { error: stepsError, className: classes.newStepContainer },
            react_1.default.createElement("div", { className: classes.newStep },
                react_1.default.createElement(TextField_1.default, { className: classes.newStepField, label: `Add New ${stepType}`, multiline: true, placeholder: `Enter a new ${stepType} here`, rows: 2, rowsMax: 4, error: stepsError, InputLabelProps: {
                        shrink: true,
                    }, variant: "outlined", inputRef: (ref) => {
                        newStepField = ref;
                    } }),
                react_1.default.createElement(IconButtons_1.IconButtonWithBackground, { onClick: () => addNewStep(newStepField.value) },
                    react_1.default.createElement(Add_1.default, null))),
            stepsError && react_1.default.createElement(FormHelperText_1.default, null, `You must have at least one ${stepType}`))));
};
exports.default = Steps;
