// TimelineItem.js
import React from 'react';

const TimelineItem = ({ timestamp, description, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{timestamp}</td>
      <td>{description}</td>
      <td>
        <div className="actions">
          <button type="button" className="edit-button" onClick={onEdit}>
            <i className="bi bi-pencil-square"></i>
          </button>
          <button type="button" className="delete-button" onClick={onDelete}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TimelineItem;