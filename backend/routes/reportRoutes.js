const express = require('express');
const router = express.Router();
const { generatePpt } = require('../services/pptService');

router.post('/generate-ppt', async (req, res) => {
  try {
    const reportData = req.body;
    const pptx = generatePpt(reportData);
    
    // Kirim file PPT sebagai respons
    const fileName = `${reportData.event.replace(/[^a-z0-9]/gi, '_')}.pptx`;
    pptx.writeFile({ fileName: fileName }).then(fileContent => {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.send(fileContent);
    });
    
  } catch (error) {
    console.error('Terjadi kesalahan saat membuat PPT:', error);
    res.status(500).json({ message: 'Gagal membuat presentasi.' });
  }
});

module.exports = router;