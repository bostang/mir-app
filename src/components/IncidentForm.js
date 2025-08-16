import React, { useState } from 'react';
import Timeline from './Timeline';
import './Form.css';

const IncidentForm = () => {
  // State untuk data form dan error
  const [formData, setFormData] = useState({
    event: '',
    impact: '',
    suspect: '',
    action: '',
    pic: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // State untuk data timeline dan error
  const [timelineData, setTimelineData] = useState([]);
  const [newTimelineItem, setNewTimelineItem] = useState({
    timestamp: '',
    description: '',
  });
  const [timelineErrors, setTimelineErrors] = useState({});

  // Handler untuk input form utama
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Hapus error saat user mulai mengetik
    setFormErrors({ ...formErrors, [name]: '' });
  };

  // Handler untuk input timeline baru
  const handleTimelineChange = (e) => {
    const { name, value } = e.target;
    setNewTimelineItem({ ...newTimelineItem, [name]: value });
    // Hapus error saat user mulai mengetik
    setTimelineErrors({ ...timelineErrors, [name]: '' });
  };

  // Logika validasi untuk form utama
  const validateForm = () => {
    const errors = {};
    if (!formData.event.trim()) {
      errors.event = 'Event tidak boleh kosong';
    }
    if (!formData.impact.trim()) {
      errors.impact = 'Dampak tidak boleh kosong';
    }
    if (!formData.pic.trim()) {
      errors.pic = 'PIC tidak boleh kosong';
    }
    return errors;
  };

  // Logika validasi untuk item timeline baru
  const validateTimelineItem = () => {
    const errors = {};
    if (!newTimelineItem.timestamp.trim()) {
      errors.timestamp = 'Waktu tidak boleh kosong';
    }
    if (!/^\d{2}:\d{2}$/.test(newTimelineItem.timestamp.trim())) {
      errors.timestamp = 'Format waktu harus HH:MM (cth: 16:41)';
    }
    if (!newTimelineItem.description.trim()) {
      errors.description = 'Deskripsi tidak boleh kosong';
    }
    return errors;
  };

  // Handler saat tombol 'Tambah Timeline' diklik
  const handleAddTimeline = () => {
    const errors = validateTimelineItem();
    if (Object.keys(errors).length === 0) {
      setTimelineData([...timelineData, newTimelineItem]);
      setNewTimelineItem({ timestamp: '', description: '' }); // Reset input
      setTimelineErrors({}); // Reset error
    } else {
      setTimelineErrors(errors);
    }
  };

  // Handler saat form disubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Jika tidak ada error, data bisa dikirim ke backend
      const finalReport = {
        ...formData,
        timeline: timelineData,
      };
      console.log('Final Report:', finalReport);
      alert('Laporan berhasil dibuat! Cek console untuk melihat datanya.');
    } else {
      // Jika ada error, tampilkan pesan error
      setFormErrors(errors);
      alert('Terdapat data yang belum diisi dengan benar. Mohon periksa kembali.');
    }
  };

    return (
    <div className="form-container">
        <h1>Major Incident Report (MIR) Generator 📝</h1>
        <form onSubmit={handleSubmit}>
        {/* Form untuk Event */}
        <div className="form-group">
            <label htmlFor="event">Event: *</label>
            <input
            type="text"
            id="event"
            name="event"
            value={formData.event}
            onChange={handleInputChange}
            />
            {formErrors.event && <p className="error-message">⚠️ {formErrors.event}</p>}
        </div>

        {/* Form untuk Dampak */}
        <div className="form-group">
            <label htmlFor="impact">Dampak: *</label>
            <textarea
            id="impact"
            name="impact"
            value={formData.impact}
            onChange={handleInputChange}
            ></textarea>
            {formErrors.impact && <p className="error-message">⚠️ {formErrors.impact}</p>}
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
            <label htmlFor="pic">PIC: *</label>
            <input
            type="text"
            id="pic"
            name="pic"
            value={formData.pic}
            onChange={handleInputChange}
            />
            {formErrors.pic && <p className="error-message">⚠️ {formErrors.pic}</p>}
        </div>

        {/* --- Bagian Timeline --- */}
        <div className="timeline-input-section">
            <h2>Tambah Kronologis</h2>
            <div className="timeline-input-group">
            <div className="form-group time-input">
                <label htmlFor="timestamp">Waktu: *</label>
                <input
                type="text"
                id="timestamp"
                name="timestamp"
                placeholder="cth: 16:41"
                value={newTimelineItem.timestamp}
                onChange={handleTimelineChange}
                />
                {timelineErrors.timestamp && <p className="error-message">⏰ {timelineErrors.timestamp}</p>}
            </div>
            <div className="form-group description-input">
                <label htmlFor="description">Deskripsi: *</label>
                <textarea
                id="description"
                name="description"
                placeholder="Deskripsi kegiatan atau temuan..."
                value={newTimelineItem.description}
                onChange={handleTimelineChange}
                ></textarea>
                {timelineErrors.description && <p className="error-message">✍️ {timelineErrors.description}</p>}
            </div>
            <button type="button" onClick={handleAddTimeline}>
                Tambah
            </button>
            </div>
        </div>

        {/* Tampilkan timeline yang sudah ditambahkan */}
        {timelineData.length > 0 && <Timeline timelineData={timelineData} />}
        
        {/* Tambahkan keterangan ini di sini */}
        <p className="required-note">* Bidang dengan tanda bintang wajib diisi</p>

        {/* Tombol Submit Utama */}
        <button type="submit" className="submit-button">
            Buat Laporan MIR
        </button>
        </form>
    </div>
    );
};

export default IncidentForm;