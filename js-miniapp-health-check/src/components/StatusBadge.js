import React from 'react';
import { makeStyles, Chip, CircularProgress } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { CHECK_STATUS } from '../services/sdkChecks';

const useStyles = makeStyles(() => ({
  chip: {
    fontWeight: 600,
    fontSize: '0.7rem',
    height: 24,
    minWidth: 88,
    borderRadius: 12,
  },
  success: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    border: '1px solid #a5d6a7',
  },
  failure: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    border: '1px solid #ef9a9a',
  },
  skipped: {
    backgroundColor: '#fff8e1',
    color: '#f57f17',
    border: '1px solid #ffe082',
  },
  pending: {
    backgroundColor: '#f5f5f5',
    color: '#757575',
    border: '1px solid #e0e0e0',
  },
  running: {
    backgroundColor: '#e3f2fd',
    color: '#1565c0',
    border: '1px solid #90caf9',
  },
  spinnerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
  },
}));

function StatusBadge({ status }) {
  const classes = useStyles();

  if (status === CHECK_STATUS.RUNNING) {
    return (
      <div className={classes.spinnerWrapper}>
        <CircularProgress size={18} thickness={4} style={{ color: '#1565c0' }} />
      </div>
    );
  }

  const configs = {
    [CHECK_STATUS.SUCCESS]: {
      label: 'PASSED',
      icon: <CheckCircleIcon style={{ fontSize: 14, color: '#2e7d32' }} />,
      className: classes.success,
    },
    [CHECK_STATUS.FAILURE]: {
      label: 'FAILED',
      icon: <CancelIcon style={{ fontSize: 14, color: '#c62828' }} />,
      className: classes.failure,
    },
    [CHECK_STATUS.SKIPPED]: {
      label: 'MANUAL',
      icon: <PauseCircleOutlineIcon style={{ fontSize: 14, color: '#f57f17' }} />,
      className: classes.skipped,
    },
    [CHECK_STATUS.PENDING]: {
      label: 'PENDING',
      icon: <HelpOutlineIcon style={{ fontSize: 14, color: '#757575' }} />,
      className: classes.pending,
    },
  };

  const config = configs[status] || configs[CHECK_STATUS.PENDING];

  return (
    <Chip
      label={config.label}
      icon={config.icon}
      size="small"
      className={`${classes.chip} ${config.className}`}
    />
  );
}

export default StatusBadge;
