# Major Incident Report (MIR) Generator 📝

Aplikasi web untuk membuat laporan insiden besar (Major Incident Report) dalam format yang terstruktur. Aplikasi ini memungkinkan pengguna untuk memasukkan detail insiden, kronologi, dan menghasilkan laporan dalam format JSON atau PowerPoint (PPTX).

## Catatan

- Untuk memastikan bahwa menu Call Tree dapat diakses, pastikan bahwa daftar aplikasi tersimpan di `backend/data/applications.json`.

    Berikut adalah template data aplikasi:

    ```json
    {
        "No": "12",
        "Application ID": "AMXXX",
        "Nama Aplikasi": "AwXXX",
        "Description/Definition": "Aplikasi yang dipergunakan untuk mendistribusikan beberapa Exception Report (ER) kepada pimpinan unit bisnis sehingga dapat dipergunakan oleh first line sebagai salah satu sarana supervise atas risiko operasional",
        "Business Owner": "IAD",
        "System Owner": "ADV - XXX Departement",
        "Criticality": "4-Non Critical",
        "Touchpoint": "",
        "FO/MO/BO": "MO",
        "Pengembang": "Inhouse",
        "Status": "",
        "Customer Facing": "No",
        "Status ARIS": "Done",
        "Remarks": "",
        "Param Rep/Cust": "0"
    }
    ```

- Untuk detail tambahan (seperti link War-room dan dokumen AOD) dan data PIC, pastikan file `backend/data/links.json` dan `backend/data/pics.json` tersedia.

    Berikut adalah template data untuk `links.json`:

    ```json
    [
      {
        "Application ID": "AMORAC0002",
        "aodDocLink": "[https://docs.google.com/document/d/.../edit](https://docs.google.com/document/d/.../edit)",
        "warroomLink": "[https://teams.microsoft.com/l/team/](https://teams.microsoft.com/l/team/)..."
      }
    ]
    ```

    Dan template untuk `pics.json`:

    ```json
    [
      {
        "Application ID": "AMORAC0002",
        "pics": [
          {
            "Nama": "Susilo Indriasworo",
            "Role": "L2",
            "Jabatan": "Departement Head",
            "No Telp": "08111750914",
            "Email": "susilo@bni.co.id",
            "Entity": "BNI",
            "Grup": "APS"
          }
        ]
      }
    ]
    ```

## Struktur Proyek

Proyek ini terdiri dari dua bagian utama:

- **`frontend/`**: Aplikasi web yang dibangun dengan React. Berisi antarmuka pengguna (UI) untuk memasukkan data laporan.
- **`backend/`**: Server API yang dibangun dengan Node.js. Bertanggung jawab untuk memproses data dan menghasilkan file PowerPoint.

## Persiapan

### 1. Klon Repositori

```bash
git clone [https://github.com/bostang/mir-app.git](https://github.com/bostang/mir-app.git)
cd mir-app
````

### 2\. Konfigurasi dan Instalasi Backend

Masuk ke direktori `backend` dan instal dependensi:

```bash
cd backend
npm install
```

### 3\. Konfigurasi dan Instalasi Frontend

Buka terminal baru, masuk ke direktori `frontend` dan instal dependensi:

```bash
cd frontend
npm install
```

## Menjalankan Aplikasi

Anda harus menjalankan backend dan frontend secara bersamaan di terminal terpisah.

### 1\. Jalankan Backend Server

Di terminal pertama:

```bash
cd backend
npm start
```

Server akan berjalan di `http://localhost:5000`.

### 2\. Jalankan Frontend

Di terminal kedua:

```bash
cd frontend
npm start
```

Aplikasi frontend akan terbuka di browser Anda, biasanya di `http://localhost:3000`.

## Alur Kerja

1. Pengguna memasukkan detail insiden di frontend.
2. Data dikirim ke server backend melalui API.
3. Backend memproses data dan menghasilkan file PowerPoint (PPTX).
4. Backend mengirimkan kembali file PPTX, yang kemudian dapat diunduh oleh pengguna.
