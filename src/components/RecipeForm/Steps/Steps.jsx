import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';

import { IconButtonWithBackground } from '../../../Themes/Buttons/IconButtons/IconButtons';
import useStyles from './Styles';

import Step from './Step/Step';

const Steps = ({ stepType, handleStepsChange, steps, stepsError }) => {
  let newStepField;
  const classes = useStyles();

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
    const newSteps = steps.filter(
      (element) => element.id !== step.id && element.id !== moveDown.id
    );
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

  return (
    <>
      <div>
        {steps.map((step) => (
          <Step
            step={step}
            key={step.id}
            editStep={editStep}
            moveStepOrderUp={moveStepOrderUp}
            moveStepOrderDown={moveStepOrderDown}
            deleteStep={deleteStep}
          />
        ))}
      </div>

      <FormControl error={stepsError} className={classes.newStepContainer}>
        <div className={classes.newStep}>
          <TextField
            className={classes.newStepField}
            label={`Add New ${stepType}`}
            multiline
            placeholder={`Enter a new ${stepType} here`}
            row={2}
            rowsMax={4}
            error={stepsError}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            inputRef={(ref) => {
              newStepField = ref;
            }}
          />
          <IconButtonWithBackground onClick={() => addNewStep(newStepField.value)}>
            <AddIcon />
          </IconButtonWithBackground>
        </div>
        {stepsError && <FormHelperText>{`You must have at least one ${stepType}`}</FormHelperText>}
      </FormControl>
    </>
  );
};

Steps.propTypes = {
  stepType: PropTypes.string,
  handleStepsChange: PropTypes.func,
  steps: PropTypes.array,
  stepsError: PropTypes.bool,
};

export default Steps;
