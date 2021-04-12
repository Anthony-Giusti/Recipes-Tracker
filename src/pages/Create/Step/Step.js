/* eslint-disable react/prop-types */
import { Button, Card, Container, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import useStyles from './Step-STYLES';

const Step = ({ step, editStep, moveStepOrderUp, moveStepOrderDown, deleteStep }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const classes = useStyles();

  let editField;

  return (
    <Card className={classes.card}>
      <Typography variant="h4">{step.order}</Typography>
      <Container className={classes.cardInner}>
        <div className={classes.stepDisplay}>
          {currentlyEditing ? (
            <TextField
              className={classes.editField}
              defaultValue={step.step}
              inputRef={(ref) => {
                editField = ref;
              }}
            />
          ) : (
            <Typography>{step.step}</Typography>
          )}
        </div>
        <div className={classes.cardInterface}>
          <div className={classes.cardInterfacePanel}>
            <Button endIcon={<ArrowUpwardIcon />} onClick={() => moveStepOrderUp(step)} />
            <Button endIcon={<ArrowDownwardIcon />} onClick={() => moveStepOrderDown(step)} />
          </div>
          <div className={classes.cardInterfacePanel}>
            {currentlyEditing ? (
              <Button
                endIcon={<DoneIcon onClick={() => setCurrentlyEditing(false)} />}
                onClick={() => editStep(step.id, step.order, editField.value)}
              />
            ) : (
              <Button endIcon={<EditIcon />} onClick={() => setCurrentlyEditing(true)} />
            )}
            <Button endIcon={<DeleteIcon onClick={() => deleteStep(step)} />} />
          </div>
        </div>
      </Container>
    </Card>
  );
};

export default Step;
