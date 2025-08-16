import React, { useState } from 'react';
import Timeline from './Timeline';
import './Form.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // boostrap icon
import 'bootstrap/dist/css/bootstrap.min.css'; // untuk boostrap navbar
import bniLogo from '../assets/bni-logo-white.png'; // logo BNI

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

  // State untuk data timeline, item yang diedit, dan error
  const [timelineData, setTimelineData] = useState([]);
  const [newTimelineItem, setNewTimelineItem] = useState({
    jam: '',
    menit: '',
    description: '',
  });
  const [timelineErrors, setTimelineErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);

  // Handler untuk input form utama
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  // Handler untuk input jam dan menit
  const handleTimelineChange = (e) => {
    const { name, value } = e.target;
    setNewTimelineItem({ ...newTimelineItem, [name]: value });
    setTimelineErrors({ ...timelineErrors, [name]: '' });
  };

  // Logika validasi
  const validateForm = () => {
    const errors = {};
    if (!formData.event.trim()) errors.event = 'Event tidak boleh kosong';
    if (!formData.impact.trim()) errors.impact = 'Dampak tidak boleh kosong';
    if (!formData.pic.trim()) errors.pic = 'PIC tidak boleh kosong';
    return errors;
  };

  const validateTimelineItem = () => {
    const errors = {};
    if (!newTimelineItem.jam.trim() || !newTimelineItem.menit.trim()) {
      errors.timestamp = 'Jam dan Menit tidak boleh kosong';
    } else {
      const jam = parseInt(newTimelineItem.jam, 10);
      const menit = parseInt(newTimelineItem.menit, 10);
      if (isNaN(jam) || jam < 0 || jam > 23) {
        errors.timestamp = 'Jam harus angka antara 00-23';
      }
      if (isNaN(menit) || menit < 0 || menit > 59) {
        errors.timestamp = 'Menit harus angka antara 00-59';
      }
    }
    if (!newTimelineItem.description.trim()) {
      errors.description = 'Deskripsi tidak boleh kosong';
    }
    return errors;
  };

  // Handler saat tombol 'Tambah/Simpan' timeline diklik
  const handleAddOrUpdateTimeline = () => {
    const errors = validateTimelineItem();
    if (Object.keys(errors).length === 0) {
      const timestamp = `${newTimelineItem.jam.padStart(2, '0')}:${newTimelineItem.menit.padStart(2, '0')}`;
      const itemToSave = { timestamp, description: newTimelineItem.description };

      let updatedTimeline;
      if (editingIndex !== null) {
        updatedTimeline = [...timelineData];
        updatedTimeline[editingIndex] = itemToSave;
        setEditingIndex(null);
      } else {
        updatedTimeline = [...timelineData, itemToSave];
      }

      // Urutkan array berdasarkan timestamp (waktu)
      updatedTimeline.sort((a, b) => {
        const timeA = a.timestamp.split(':').map(Number);
        const timeB = b.timestamp.split(':').map(Number);

        if (timeA[0] !== timeB[0]) {
          return timeA[0] - timeB[0];
        }
        return timeA[1] - timeB[1];
      });

      setTimelineData(updatedTimeline);
      setNewTimelineItem({ jam: '', menit: '', description: '' });
      setTimelineErrors({});
    } else {
      setTimelineErrors(errors);
    }
  };

  // Handler untuk memulai mode edit
  const handleEditTimeline = (index) => {
    const item = timelineData[index];
    const [jam, menit] = item.timestamp.split(':');
    setNewTimelineItem({ jam, menit, description: item.description });
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler untuk menghapus item timeline
  const handleDeleteTimeline = (index) => {
    const updatedTimeline = timelineData.filter((_, i) => i !== index);
    setTimelineData(updatedTimeline);
  };

  // Handler untuk memuat laporan dari file JSON
  const handleFileLoad = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const loadedData = JSON.parse(event.target.result);
          if (loadedData.event && loadedData.timeline) {
            setFormData({
              event: loadedData.event || '',
              impact: loadedData.impact || '',
              suspect: loadedData.suspect || '',
              action: loadedData.action || '',
              pic: loadedData.pic || '',
            });
            setTimelineData(loadedData.timeline || []);
            alert('Laporan berhasil dimuat dari file!');
          } else {
            alert('Format file JSON tidak valid. Pastikan file memiliki struktur yang benar.');
          }
        } catch (error) {
          alert('Gagal memuat file. Pastikan file berformat JSON yang valid.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Handler untuk menyimpan sebagai JSON
  const handleSaveJson = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const finalReport = {
        event: formData.event,
        impact: formData.impact,
        suspect: formData.suspect,
        action: formData.action,
        pic: formData.pic,
        timeline: timelineData,
      };
      const jsonString = JSON.stringify(finalReport, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = `${formData.event.trim() || 'Laporan MIR'}.json`.replace(/[^\w\s.]/gi, '_');
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('Laporan berhasil disimpan dan diunduh sebagai JSON!');
    } else {
      setFormErrors(errors);
      alert('Terdapat data yang belum diisi dengan benar. Mohon periksa kembali.');
    }
  };

  // Handler untuk menyimpan sebagai PPT
  const handleSavePpt = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const finalReport = {
        event: formData.event,
        impact: formData.impact,
        suspect: formData.suspect,
        action: formData.action,
        pic: formData.pic,
        timeline: timelineData,
      };

      try {
        const response = await fetch('http://localhost:3001/api/generate-ppt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalReport),
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          const filename = `${formData.event.trim() || 'Laporan MIR'}.pptx`.replace(/[^\w\s.]/gi, '_');
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          alert('Laporan berhasil dibuat dan diunduh sebagai PPT!');
        } else {
          alert('Gagal membuat laporan PPT. Mohon coba lagi.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menghubungkan ke server.');
      }
    } else {
      setFormErrors(errors);
      alert('Terdapat data yang belum diisi dengan benar. Mohon periksa kembali.');
    }
  };
  
  // Handler untuk menyalin ke clipboard
  const handleCopyClipboard = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const formattedText = `
*--- Major Incident Report ---*
• *Event:* ${formData.event}
• *Dampak:* ${formData.impact}
• *Suspect:* ${formData.suspect}
• *Action:* ${formData.action}
• *PIC:* ${formData.pic}

*--- Kronologis Kejadian ---*
${timelineData.map(item => `- *${item.timestamp}*: ${item.description}`).join('\n')}

_Laporan ini dibuat secara otomatis._
      `.trim();

      navigator.clipboard.writeText(formattedText)
        .then(() => {
          alert('Laporan berhasil disalin ke clipboard! Anda bisa langsung paste di aplikasi pesan seperti WhatsApp.');
        })
        .catch(err => {
          console.error('Gagal menyalin ke clipboard:', err);
          alert('Gagal menyalin laporan. Mohon coba salin manual.');
        });
    } else {
      setFormErrors(errors);
      alert('Terdapat data yang belum diisi dengan benar. Mohon periksa kembali.');
    }
  };


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container d-flex justify-content-center">
              <a className="navbar-brand" href="/">
                <img src={bniLogo} alt="Logo"  height="20" className="d-inline-block align-text-top me-2" />
                Major Incident Report (MIR) Generator 📝
              </a>
          </div>
      </nav>
      <div className="form-container">
        {/* Container untuk Judul dan tombol Muat Laporan */}
        <div className="header-and-load">  
          <div className="file-load-section">
            <label htmlFor="json-file" className="file-label">Muat Laporan</label>
            <input
              type="file"
              id="json-file"
              accept=".json"
              onChange={handleFileLoad}
            />
          </div>
        </div>

        <form>
          <div className="form-group">
            <label htmlFor="event">Event*</label>
            <input
              type="text"
              id="event"
              name="event"
              value={formData.event}
              onChange={handleInputChange}
              placeholder="Contoh: Kendala otentikasi pengguna pada layanan Mobile App"
            />
            {formErrors.event && <p className="error-message">⚠️ {formErrors.event}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="impact">Dampak*</label>
            <textarea
              id="impact"
              name="impact"
              value={formData.impact}
              onChange={handleInputChange}
              placeholder="Contoh: Pengguna tidak bisa login (terutama setelah jam 17:00)"
            ></textarea>
            {formErrors.impact && <p className="error-message">⚠️ {formErrors.impact}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="suspect">Suspect</label>
            <textarea
              id="suspect"
              name="suspect"
              value={formData.suspect}
              onChange={handleInputChange}
              placeholder="Contoh: Diduga ada masalah pada servis otentikasi"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="action">Action</label>
            <textarea
              id="action"
              name="action"
              value={formData.action}
              onChange={handleInputChange}
              placeholder="Contoh: Pengecekan status servis otentikasi di server Restart layanan secara bertahap"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="pic">PIC*</label>
            <input
              type="text"
              id="pic"
              name="pic"
              value={formData.pic}
              onChange={handleInputChange}
              placeholder="Contoh: Tim Backend, Tim SRE, Tim Keamanan"
            />
            {formErrors.pic && <p className="error-message">⚠️ {formErrors.pic}</p>}
          </div>

          <div className="timeline-input-section">
            <h2>Tambah Kronologis</h2>
            <div className="timeline-input-group">
              <div className="form-group time-input">
                <label htmlFor="jam">Waktu*</label>
                <div className="time-fields">
                  <input
                    type="number"
                    id="jam"
                    name="jam"
                    placeholder="HH"
                    value={newTimelineItem.jam}
                    onChange={handleTimelineChange}
                    min="0"
                    max="23"
                  />
                  <span className="time-separator">:</span>
                  <input
                    type="number"
                    id="menit"
                    name="menit"
                    placeholder="MM"
                    value={newTimelineItem.menit}
                    onChange={handleTimelineChange}
                    min="0"
                    max="59"
                  />
                </div>
                {timelineErrors.timestamp && <p className="error-message">⏰ {timelineErrors.timestamp}</p>}
              </div>
              <div className="form-group description-input">
                <label htmlFor="description">Deskripsi*</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Contoh: Terdapat lonjakan error HTTP 500 pada API /auth/login"
                  value={newTimelineItem.description}
                  onChange={handleTimelineChange}
                ></textarea>
                {timelineErrors.description && <p className="error-message">✍️ {timelineErrors.description}</p>}
              </div>
              <button type="button" className="add-button" onClick={handleAddOrUpdateTimeline}>
                {editingIndex !== null ? 'Simpan Perubahan' : 'Tambah'}
              </button>
            </div>
          </div>

          {timelineData.length > 0 && <Timeline timelineData={timelineData} onEdit={handleEditTimeline} onDelete={handleDeleteTimeline} />}

          <p className="required-note">* <i>Field</i> dengan tanda bintang wajib diisi</p>
          
          {/* Kontainer baru untuk tombol-tombol aksi */}
          <div className="action-buttons">
              <button type="button" className="action-button json" onClick={handleSaveJson}>
                  <i className="bi bi-download"></i> Simpan Laporan (.json)
              </button>
              <button type="button" className="action-button pptx" onClick={handleSavePpt}>
                  <i className="bi bi-download"></i> Simpan Laporan (.pptx)
              </button>
              <button type="button" className="action-button clipboard" onClick={handleCopyClipboard}>
                  <i className="bi bi-clipboard"></i> Salin ke Clipboard
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;