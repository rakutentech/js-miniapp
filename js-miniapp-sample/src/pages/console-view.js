import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { capturedLogs } from './log-capture';

const ConsoleView = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [logs, setLogs] = useState([]);

  const toggleView = () => {
    setExpanded(!isExpanded);
  };

  const getViewHeight = () => {
    return isExpanded ? '200px' : '10px'; // Adjust the heights as needed
  };

  useEffect(() => {
    setLogs(capturedLogs);
  }, [capturedLogs]);

  return (
    <div
      className={`bottom-view ${isExpanded ? 'expanded' : 'collapsed'}`}
      style={{ height: getViewHeight() }}
    >
      <div className="toggle-button" onClick={toggleView}>
        {isExpanded ? (
          <ExpandLessIcon fontSize="inherit" />
        ) : (
          <ExpandMoreIcon fontSize="inherit" />
        )}
      </div>
      <div className="content-container">
        <div className="content"></div>
        <div className="log-container">
          {logs.map((log, index) => (
            <div key={index} className={`log-item ${log.type}`}>
              {log.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsoleView;
