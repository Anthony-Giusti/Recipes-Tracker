/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

const RecipeEdit = (props) => {
  const { children } = props;

  return (
    <Dialog open>
      <DialogTitle>
        <div>Edit Recipe</div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default RecipeEdit;
