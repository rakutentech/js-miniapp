import { HostAppEvents, MAAnalyticsActionType, MAAnalyticsEventType } from 'js-miniapp-sdk';
import React, { useEffect, useRef } from 'react';
import { sendAnalytics } from './helper';

const colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'orange',
    'pink',
];

const ScrollToAnchor = () => {
    const divRefs = useRef({});

    useEffect(() => {
        sendAnalytics(
            MAAnalyticsEventType.appear,
            MAAnalyticsActionType.open,
            'Scroll To Anchor',
            'Screen',
            'Page',
            ''
        );
    }, []);

    window.addEventListener(HostAppEvents.DID_RECEIVE_QUERY_PARAMS, function (e) {
        let message = e.detail.message;
        console.log(message);
    });

    return (
        <div style={{ padding: 24 }}>
            <h2>Scroll To Anchor Demo</h2>
            <p>Trigger the <code>miniappscrolltoanchor</code> event with <code>anchorId</code> to scroll to a color section.</p>
            {colors.map((color) => (
                <div
                    key={color}
                    id={color}
                    ref={el => (divRefs.current[color] = el)}
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
