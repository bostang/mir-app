const express = require('express');
const router = express.Router();
const { generatePpt } = require('../services/pptService');

router.post('/generate-ppt', async (req, res) => {
  try {
    const reportData = req.body;
    const pptx = generatePpt(reportData);
    
    // Tunggu Promise dari pptx.write() yang mengembalikan Blob
    const blob = await pptx.write();
    
    // Ubah Blob menjadi ArrayBuffer secara asinkron
    const arrayBuffer = await blob.arrayBuffer();

    const fileName = `${reportData.event.replace(/[^a-z0-9]/gi, '_')}.pptx`;
    
    // Mengatur header respons
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    
    // Mengirimkan ArrayBuffer sebagai respons, Node.js akan mengonversinya menjadi Buffer
    res.send(Buffer.from(arrayBuffer));

  } catch (error) {
    console.error('Terjadi kesalahan saat membuat PPT:', error);
    res.status(500).json({ message: 'Gagal membuat presentasi.' });
  }
});

module.exports = router;