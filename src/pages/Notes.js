import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, makeStyles } from '@material-ui/core';
import Masonry from 'react-masonry-css';
import { grey } from '@material-ui/core/colors';
import NoteCard from '../components/NoteCard';

const useStyles = makeStyles({
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
    backgroundColor: grey,
    marginBottom: 30,
  },
});

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch('http://localhost:8000/notes').then((response) =>
      response.json().then((data) => setNotes(data))
    );
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'DELETE',
    });

    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const breakPoints = {
    default: 3,
    1100: 2,
    800: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakPoints}
        className={classes.myMasonryGrid}
        columnClassName={classes.myMasonryGridColumn}
      >
        {notes.map((note) => (
          <div className={classes.masonryGridItem}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
