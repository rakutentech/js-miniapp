import React from 'react';
import MiniApp from 'js-miniapp-sdk';
import { TextField, Button, Typography } from '@material-ui/core';

class GetExchangeTokenPage extends React.Component {
  state = {
    audience: '',
    scopes: '',
    statusMessage: '',
    isError: false
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleGetExchangeToken = async () => {
    const { audience, scopes } = this.state;
    const scopesArray = scopes.split(',').map(scope => scope.trim());
    try {
      const token = await MiniApp.user.getExchangeToken(audience, scopesArray);
      this.setState({ statusMessage: `Exchange token: ${token}`, isError: false });
    } catch (error) {
      this.setState({ statusMessage: `Get exchange token failed: ${error.message}`, isError: true });
    }
  };

  render() {
    return (
      <div>
        <TextField
          label="Enter audience"
          name="audience"
          value={this.state.audience}
          onChange={this.handleInputChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Enter scopes (comma separated)"
          name="scopes"
          value={this.state.scopes}
          onChange={this.handleInputChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleGetExchangeToken}
        >
          Get Exchange Token
        </Button>
        {this.state.statusMessage && (
          <Typography
            variant="body1"
            color={this.state.isError ? "error" : "textSecondary"}
            style={{ marginTop: '20px', wordBreak: 'break-all' }}
          >
            {this.state.statusMessage}
          </Typography>
        )}
      </div>
    );
  }
}

export default GetExchangeTokenPage;
