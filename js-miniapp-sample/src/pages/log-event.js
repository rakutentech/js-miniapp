import React from 'react';
import MiniApp, { LogType } from 'js-miniapp-sdk';
import { Button, TextField, Grid } from '@material-ui/core';

class LogEventPage extends React.Component {
  state = {
    logMessage: '',
    statusMessage: '',
  };

  handleLogEvent = async () => {
    try {
      const result = await MiniApp.miniappUtils.logEvent(
        this.state.logMessage,
        LogType.INFO
      );
      console.log('Event logged:', result);
      this.setState({ statusMessage: 'Event logged successfully' });
    } catch (error) {
      console.error('Log event failed:', error);
      this.setState({ statusMessage: 'Log event failed' });
    }
  };

  handleInputChange = (event) => {
    this.setState({ logMessage: event.target.value });
  };

  render() {
    const isError = this.state.statusMessage.includes('failed');
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Log Message"
            value={this.state.logMessage}
            onChange={this.handleInputChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleLogEvent}
            fullWidth
          >
            Log Event
          </Button>
        </Grid>
        <Grid item xs={12}>
          <p style={{ color: isError ? 'red' : 'black' }}>
            {this.state.statusMessage}
          </p>
        </Grid>
      </Grid>
    );
  }
}

export default LogEventPage;
