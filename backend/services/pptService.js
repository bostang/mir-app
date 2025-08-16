const PptxGenJS = require('pptxgenjs');

// Fungsi untuk membuat presentasi dari data laporan
const generatePpt = (reportData) => {
  const pptx = new PptxGenJS();
  
  // Slide 1: Judul Laporan
  const slide1 = pptx.addSlide();
  slide1.addText('Major Incident Report', { x: 1, y: 0.5, fontSize: 28, bold: true });
  slide1.addText(`Event: ${reportData.event}`, { x: 1, y: 1.5, fontSize: 18 });
  slide1.addText(`Dampak:`, { x: 1, y: 2.5, fontSize: 16 });
  slide1.addText(reportData.impact, { x: 1, y: 3, fontSize: 14 });

  // Slide 2: Kronologis
  const slide2 = pptx.addSlide();
  slide2.addText('Kronologis Kejadian', { x: 0.5, y: 0.5, fontSize: 24, bold: true });
  
  // Buat tabel untuk timeline
  const timelineData = reportData.timeline.map(item => [item.timestamp, item.description]);
  slide2.addTable([['Waktu', 'Kegiatan / Temuan'], ...timelineData], {
    x: 0.5, y: 1.5, w: 9, 
    border: [{ pt: 1, color: "EFEFEF" }],
    fill: "FFFFFF",
    fontSize: 12,
    colW: [1, 8]
  });

  return pptx;
};

module.exports = { generatePpt };