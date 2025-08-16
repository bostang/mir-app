import React from 'react';
import TimelineItem from './TimelineItem';
import './Timeline.css';

const Timeline = ({ timelineData, onEdit, onDelete }) => {
  return (
    <div className="timeline-container">
      <h3>Timeline Kronologis<h3>
      <table>
        <thead>
          <tr>
            <th>Waktu</th>
            <th>Kegiatan / Temuan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              timestamp={item.timestamp}
              description={item.description}
              onEdit={() => onEdit(index)}
              onDelete={() => onDelete(index)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timeline;