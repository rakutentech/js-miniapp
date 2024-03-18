import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles((theme) => ({
  content: {
    height: '25%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
  },
  card: {
    marginTop: '40px',
  },
  actions: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button: {
    marginTop: '20px',
    width: '80%',
    maxWidth: 280,
  },
  textfield: {
    width: '80%',
    maxWidth: 300,
    '& input': {
      color: theme.color.primary,
      lineHeight: '1.5em',
      fontSize: '1.2em',
      background: 'white',
    },
  },
  scrollable: {
    overflowY: 'scroll',
    width: '100%',
    paddingTop: '20px',
    paddingBottom: '50px',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function FeatureListComponent() {
  const classes = useStyles();
  const [featureList, setFeatureList] = useState();
  useEffect(() => {
    try {
      getFeatureList();
    } catch (e) {
      console.log(e);
    }
  }, []);

  function getFeatureList() {
    MiniApp.miniappUtils
      .getFeatureList()
      .then((response) => {
        setFeatureList(response);
        console.log('getFeatureList SUCCESS: ', response);
      })
      .catch((error) => {
        console.log('getFeatureList ERROR: ', error);
      });
  }

  return (
    <div className={classes.scrollable}>
      <TableContainer component={Paper}>
        <Table aria-label="Feature lists">
          <TableBody>
            {featureList &&
              featureList.map((row) => (
                <StyledTableRow key={row}>
                  <StyledTableCell component="th" scope="row">
                    {row}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FeatureListComponent;
