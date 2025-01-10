import React, { useState } from 'react';
import MiniApp from 'js-miniapp-sdk';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class TriggerLoginUIPage extends React.Component {
  state = {
    message: '',
    error: false,
  };

  handleLogin = async () => {
    try {
      const result = await MiniApp.user.triggerLoginUI();
      this.setState({ message: 'Login successful: ' + result, error: false });
    } catch (error) {
      this.setState({ message: 'Login failed: ' + error, error: true });
    }
  };

  render() {
    return (
      <div>
        <br/>
        <br/>
        <Button variant="contained" color="primary" onClick={this.handleLogin}>
          Trigger Login
        </Button>
        <Typography color={this.state.error ? 'error' : 'primary'}>
          {this.state.message}
        </Typography>
      </div>
    );
  }
}

export default TriggerLoginUIPage;
