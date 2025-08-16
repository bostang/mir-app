import React from 'react';
import TimelineItem from './TimelineItem';
import './Timeline.css';

const Timeline = ({ timelineData }) => {
  return (
    <div className="timeline-container">
      <h2>Timeline Kronologis</h2>
      <table>
        <thead>
          <tr>
            <th>Waktu</th>
            <th>Kegiatan / Temuan</th>
          </tr>
        </thead>
        <tbody>
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              timestamp={item.timestamp}
              description={item.description}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timeline;