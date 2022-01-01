import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';

const PageContainer = withStyles(() => ({
  root: {
    maxWidth: 1400,
  },
}))(Container);

export default PageContainer;
