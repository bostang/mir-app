# MIR-App Frontend

Aplikasi web sederhana untuk membuat laporan Major Incident Report (MIR) dengan mudah, lengkap dengan fitur kronologis dan kemampuan simpan/muat data dalam format JSON.

## Fitur Utama ✨

* **Pembuatan Laporan MIR**: Antarmuka form yang intuitif untuk mengisi detail insiden utama, seperti `Event`, `Dampak`, `Suspect`, `Action`, dan `PIC`.
* **Daftar Kronologis Interaktif**: Tambahkan, edit, dan hapus item kronologis dengan rapi, yang secara otomatis diurutkan berdasarkan waktu.
* **Validasi Formulir**: Memberikan notifikasi visual untuk bidang-bidang yang wajib diisi.
* **Simpan Laporan**: Unduh laporan yang telah dibuat ke dalam file JSON. Nama file akan secara otomatis disesuaikan dengan nama event.
* **Muat Laporan**: Unggah file JSON yang sudah ada untuk melanjutkan atau mengedit laporan yang telah disimpan sebelumnya.

## Teknologi yang Digunakan 💻

* **React**: Pustaka JavaScript untuk membangun antarmuka pengguna yang reaktif.
* **CSS Flexbox**: Digunakan untuk tata letak yang responsif dan rapi, memastikan semua elemen form dan tabel sejajar dengan baik.
* **JavaScript (ES6+)**: Logika inti untuk mengelola state, validasi, dan interaksi dengan file (simpan/muat JSON).

## Struktur Proyek 📁

```tree
.
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Timeline.js       # Komponen untuk menampilkan tabel kronologis
│   ├── IncidentForm.js     # Komponen utama yang berisi seluruh form
│   ├── App.js              # Komponen utama yang merender IncidentForm
│   ├── index.js            # Titik masuk (entry point) aplikasi React
│   └── Form.css            # Styling untuk seluruh form
└── README.md
```

## Cara Menjalankan Aplikasi di Lokal 🚀

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di mesin lokal Anda:

1. **Pastikan Node.js dan npm terinstal**
    Jika belum, instal dari [https://nodejs.org/](https://nodejs.org/).

2. **Kloning repositori**

    ```bash
    git clone https://github.com/bostang/mir-app
    cd mir-app
    ```

3. **Instal dependensi**
    Jalankan perintah berikut di terminal Anda:

    ```bash
    npm install
    ```

4. **Jalankan aplikasi**
    Setelah instalasi selesai, Anda bisa menjalankan aplikasi dengan:

    ```bash
    npm start
    ```

    Aplikasi akan terbuka secara otomatis di browser Anda pada alamat `http://localhost:3000`.

## Cara Menggunakan 💡

1. **Isi Formulir**: Lengkapi detail insiden pada bagian "Event", "Dampak", "Suspect", "Action", dan "PIC".
2. **Tambah Kronologis**: Gunakan bagian "Tambah Kronologis" untuk mencatat setiap langkah atau peristiwa.
      * Masukkan **Jam (HH)** dan **Menit (MM)**.
      * Masukkan **Deskripsi** singkat.
      * Klik tombol **"Tambah"** untuk menambahkan item ke tabel.
3. **Edit atau Hapus Kronologis**:
      * Klik tombol **"Edit"** (`📝`) di samping item timeline untuk mengubahnya.
      * Klik tombol **"Hapus"** (`🗑️`) untuk menghapus item.
4. **Muat Laporan**: Klik tombol **"Pilih File JSON"** untuk mengunggah laporan yang telah disimpan sebelumnya.
5. **Simpan Laporan**: Setelah selesai, klik **"Simpan Laporan"** di bagian bawah form untuk mengunduh laporan sebagai file JSON.
