import React, { useState } from 'react';
import Timeline from './Timeline';
import './Form.css';

const IncidentForm = () => {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    event: '',
    impact: '',
    suspect: '',
    action: '',
    pic: '',
  });

  // State untuk menyimpan data timeline
  const [timelineData, setTimelineData] = useState([]);
  const [newTimelineItem, setNewTimelineItem] = useState({
    timestamp: '',
    description: '',
  });

  // Handler untuk input form utama
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler untuk input timeline baru
  const handleTimelineChange = (e) => {
    const { name, value } = e.target;
    setNewTimelineItem({ ...newTimelineItem, [name]: value });
  };

  // Handler saat tombol 'Tambah Timeline' diklik
  const handleAddTimeline = () => {
    if (newTimelineItem.timestamp && newTimelineItem.description) {
      setTimelineData([...timelineData, newTimelineItem]);
      setNewTimelineItem({ timestamp: '', description: '' }); // Reset input
    }
  };

  // Handler saat form disubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReport = {
      ...formData,
      timeline: timelineData,
    };
    console.log('Final Report:', finalReport);
    alert('Laporan berhasil dibuat! Cek console untuk melihat datanya.');
  };

  return (
    <div className="form-container">
      <h1>Major Incident Report (MIR) Generator 📝</h1>
      <form onSubmit={handleSubmit}>
        {/* Form untuk Event */}
        <div className="form-group">
          <label htmlFor="event">Event:</label>
          <input
            type="text"
            id="event"
            name="event"
            value={formData.event}
            onChange={handleInputChange}
          />
        </div>

        {/* Form untuk Dampak */}
        <div className="form-group">
          <label htmlFor="impact">Dampak:</label>
          <textarea
            id="impact"
            name="impact"
            value={formData.impact}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Form untuk Suspect */}
        <div className="form-group">
          <label htmlFor="suspect">Suspect:</label>
          <input
            type="text"
            id="suspect"
            name="suspect"
            value={formData.suspect}
            onChange={handleInputChange}
          />
        </div>

        {/* Form untuk Action */}
        <div className="form-group">
          <label htmlFor="action">Action:</label>
          <textarea
            id="action"
            name="action"
            value={formData.action}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Form untuk PIC */}
        <div className="form-group">
          <label htmlFor="pic">PIC:</label>
          <input
            type="text"
            id="pic"
            name="pic"
            value={formData.pic}
            onChange={handleInputChange}
          />
        </div>

        {/* --- Bagian Timeline --- */}
        <div className="timeline-input-section">
          <h2>Tambah Kronologis</h2>
          <div className="timeline-input-group">
            <div className="form-group time-input">
              <label htmlFor="timestamp">Waktu:</label>
              <input
                type="text"
                id="timestamp"
                name="timestamp"
                placeholder="cth: 16:41"
                value={newTimelineItem.timestamp}
                onChange={handleTimelineChange}
              />
            </div>
            <div className="form-group description-input">
              <label htmlFor="description">Deskripsi:</label>
              <textarea
                id="description"
                name="description"
                placeholder="Deskripsi kegiatan atau temuan..."
                value={newTimelineItem.description}
                onChange={handleTimelineChange}
              ></textarea>
            </div>
            <button type="button" onClick={handleAddTimeline}>
              Tambah
            </button>
          </div>
        </div>

        {/* Tampilkan timeline yang sudah ditambahkan */}
        {timelineData.length > 0 && <Timeline timelineData={timelineData} />}
        
        {/* Tombol Submit Utama */}
        <button type="submit" className="submit-button">
          Buat Laporan MIR
        </button>
      </form>
    </div>
  );
};

export default IncidentForm;