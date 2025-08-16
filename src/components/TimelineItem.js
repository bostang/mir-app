import React from 'react';
import './Timeline.css';

const TimelineItem = ({ timestamp, description, onEdit, onDelete }) => {
  return (
    <tr>
      <td><strong>{timestamp}</strong></td>
      <td>{description}</td>
      <td className="timeline-actions">
        <button onClick={onEdit} className="edit-button">Edit</button>
        <button onClick={onDelete} className="delete-button">Hapus</button>
      </td>
    </tr>
  );
};

export default TimelineItem;