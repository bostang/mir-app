# MIR-App Backend

Aplikasi backend untuk **Major Incident Report (MIR) Generator**. Bertanggung jawab untuk memproses logika bisnis, termasuk pembuatan laporan PowerPoint (PPTX) dan menangani data laporan dalam format JSON.

## Fitur Utama

- **Konversi Laporan**: Mengubah data laporan insiden dari format JSON menjadi dokumen PowerPoint (PPTX).
- **API Endpoint**: Menyediakan endpoint untuk menerima data laporan dan mengembalikan file PPTX.

## Teknologi

- **Node.js**: Lingkungan runtime JavaScript.
- **Express**: Framework web untuk membangun API.
- **PptxGenJS**: Library untuk membuat file PowerPoint secara terprogram.

## Persiapan

1. Masuk ke direktori `backend`:

    ```bash
    cd backend
    ```

2. Instal semua dependensi yang diperlukan:

    ```bash
    npm install
    ```

## Menjalankan Aplikasi

Jalankan server backend:

```bash
npm start
```

Server akan berjalan di `http://localhost:5000` (atau port lain yang dikonfigurasi).

## Endpoint API

### `POST /generate-pptx`

- **Deskripsi**: Menerima data JSON dari frontend dan menghasilkan file PPTX.
- **Request Body**:

```json
{
    "event": "...",
    "impact": "...",
    "suspect": "...",
    "action": "...",
    "pic": "...",
    "timeline": [
    { "timestamp": "...", "description": "..." }
    ]
}
```

- **Respons**: Mengembalikan file `.pptx`.
