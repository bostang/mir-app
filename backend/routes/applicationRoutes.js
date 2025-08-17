const express = require('express');
const router = express.Router();
const applications = require('../data/applications.json');
const links = require('../data/links.json');
const pics = require('../data/pics.json'); // Impor data PIC

// Endpoint untuk mendapatkan seluruh daftar aplikasi
router.get('/', (req, res) => {
  res.status(200).json(applications);
});

// Endpoint untuk mendapatkan detail satu aplikasi berdasarkan ID
router.get('/:appId', (req, res) => {
  const appId = req.params.appId;
  const application = applications.find(app => app['Application ID'] === appId);

  if (!application) {
    return res.status(404).json({ message: 'Aplikasi tidak ditemukan.' });
  }

  const applicationLinks = links.find(link => link['Application ID'] === appId);
  
  const combinedData = {
    ...application,
    ...applicationLinks
  };

  res.status(200).json(combinedData);
});

// Endpoint baru untuk mendapatkan daftar PIC
router.get('/:appId/pics', (req, res) => {
    const appId = req.params.appId;
    const applicationPics = pics.find(p => p['Application ID'] === appId);

    if (applicationPics) {
        res.status(200).json(applicationPics.pics);
    } else {
        res.status(404).json({ message: 'Data PIC tidak ditemukan.' });
    }
});

module.exports = router;