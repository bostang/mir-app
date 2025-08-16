import React from 'react';
import './Timeline.css';

const TimelineItem = ({ timestamp, description }) => {
  return (
    <tr>
      <td><strong>{timestamp}</strong></td>
      <td>{description}</td>
    </tr>
  );
};

export default TimelineItem;