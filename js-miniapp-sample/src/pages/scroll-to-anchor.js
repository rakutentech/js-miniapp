import {
  MAAnalyticsActionType,
  MAAnalyticsEventType,
  HostAppEvents,
} from 'js-miniapp-sdk';
import React, { useEffect, useRef } from 'react';
import { sendAnalytics } from './helper';
import { useLocation } from 'react-router-dom';

const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];

const ScrollToAnchor = () => {
  const divRefs = useRef({});

  const { pathname, hash } = useLocation();

  const onReceivedQueryParams = (e) => {
    console.log(
      `on scroll-to-anchor ${HostAppEvents.DID_RECEIVE_QUERY_PARAMS} Event -> ${e.detail.message}`
    );
    try {
      let _message = JSON.parse(e.detail.message);
      _message.forEach((val, ind, arr) => {
        if (val.name === 'scrollTo') {
          const element = document.getElementById(val.value);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    } catch (e) {
      console.error(
        `on home ${HostAppEvents.DID_RECEIVE_QUERY_PARAMS} Error -> ${e}`
      );
    }
  };

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1)); // Remove the '#'
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // or 'auto'
      }
    }
    window.addEventListener(
      HostAppEvents.DID_RECEIVE_QUERY_PARAMS,
      onReceivedQueryParams
    );

    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'Scroll To Anchor',
      'Screen',
      'Page',
      ''
    );
    return () => {
      window.removeEventListener(
        HostAppEvents.DID_RECEIVE_QUERY_PARAMS,
        onReceivedQueryParams
      );
    };
  }, [pathname, hash]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Scroll To Anchor Demo</h2>
      <p>
        Trigger the <code>miniappscrolltoanchor</code> event with{' '}
        <code>anchorId</code> to scroll to a color section.
      </p>
      {colors.map((color) => (
        <div
          key={color}
          id={color}
          ref={(el) => (divRefs.current[color] = el)}
          style={{
            height: 300,
            background: color,
            margin: '24px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 32,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default ScrollToAnchor;
