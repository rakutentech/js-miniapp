import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ConsoleView = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mount, setMount] = useState(false);

  const toggleView = () => {
    setIsExpanded(!isExpanded);
  };

  const getViewHeight = () => {
    return isExpanded ? '200px' : '10px'; // Adjust the heights as needed
  };

  if (window.console !== undefined) {
    if (mount === false) {
      setMount(true);
      window.console = {
        log: function (str) {
          let test = document.createElement('div');
          test.appendChild(document.createTextNode(str));
          document.getElementById('myLog').appendChild(test);
        },
        error: function (str) {
          let test = document.createElement('div');
          test.appendChild(document.createTextNode(str));
          document.getElementById('myLog').appendChild(test);
        },
      };
    }
  }

  return (
    <div
      className={`bottom-view ${isExpanded ? 'expanded' : 'collapsed'}`}
      style={{ height: getViewHeight() }}
    >
      <div className="toggle-button" onClick={toggleView}>
        {isExpanded ? (
          <ExpandMoreIcon fontSize="inherit" />
        ) : (
          <ExpandLessIcon fontSize="inherit" />
        )}
      </div>
      <div className="content-container">
        <div className="content"></div>
        <div className="log-container" id="myLog"></div>
      </div>
    </div>
  );
};

export default ConsoleView;
