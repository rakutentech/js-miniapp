import { createTheme } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';

export default createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: grey,
  },
  color: {
    primary: '#000000',
    secondary: 'lightgrey',
    white: '#FFFFFF',
    error: red[500],
  },
});
