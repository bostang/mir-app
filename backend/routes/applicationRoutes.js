const express = require('express');
const router = express.Router();
const applications = require('../data/applications.json');
const links = require('../data/links.json');
const pics = require('../data/pics.json');

// Endpoint untuk mendapatkan seluruh daftar aplikasi
router.get('/', (req, res) => {
  res.status(200).json(applications);
});

// Endpoint untuk mendapatkan detail satu aplikasi berdasarkan ID
router.get('/:appId', (req, res) => {
  const appId = req.params.appId;
  
  // Cari data aplikasi dari applications.json
  const application = applications.find(app => app['Application ID'] === appId);

  if (!application) {
    return res.status(404).json({ message: 'Aplikasi tidak ditemukan.' });
  }

  // Cari data link dari links.json
  const applicationLinks = links.find(link => link['Application ID'] === appId);
  
  // Cari data PIC dari pics.json
  const applicationPics = pics.find(p => p['Application ID'] === appId);
  
  // Gabungkan semua data menjadi satu objek
  const combinedData = {
    ...application,
    ...applicationLinks,
    // Tambahkan array PIC ke dalam objek utama
    pics: applicationPics ? applicationPics.pics : []
  };

  res.status(200).json(combinedData);
});

// Hapus endpoint ini karena data PIC sekarang ada di endpoint /:appId
// router.get('/:appId/pics', ...);

module.exports = router;