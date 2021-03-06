import { makeStyles } from '@material-ui/core';

export default makeStyles({
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
