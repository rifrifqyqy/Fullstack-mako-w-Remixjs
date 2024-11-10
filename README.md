# Mako Bakery Website
Website Mako Bakery adalah platform fullstack untuk menampilkan profil perusahaan dan mengelola menu produk. Proyek ini menggunakan Remix v2 sebagai framework frontend dan backend, dengan Prisma sebagai ORM untuk manajemen database.

## Technologies

![Remix](https://img.shields.io/badge/remix-%23000.svg?style=for-the-badge&logo=remix&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Prisma](https://img.shields.io/badge/Framer%20Motion-black?style=for-the-badge&logo=framer&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Fitur

- Autentikasi
  Login dengan dua role: User dan Admin.
  Sistem autentikasi yang membedakan akses antara pengguna umum dan admin.
- Tampilan Menu Produk
  Pengguna dapat melihat daftar menu produk yang disediakan oleh Mako Bakery.
- Rating dan Komentar
  Pengguna dapat memberikan rating dan komentar pada setiap produk. Fitur ini memungkinkan pengunjung untuk berbagi pengalaman mereka.
- Dashboard Admin
  Admin memiliki akses ke dashboard untuk mengelola menu, termasuk menambah, mengedit, dan menghapus produk.
- Tampilan UX/UI yang Disempurnakan
  Desain antarmuka pengguna dibuat lebih menarik dan mudah digunakan.

Persiapan Proyek
Prasyarat

- Node.js 16 atau lebih tinggi
- MongoDB
- Prisma
- Instalasi

Clone repositori ini:

```bash
git clone https://github.com/username/mako-bakery.git
cd mako-bakery
```

Instal dependensi:

```bash
npm install
```

Konfigurasi Prisma:
Buat file .env dan atur koneksi database Anda:

```bash
DATABASE_URL="your_mongouri"
```

## Menjalankan Proyek

Pengembangan Lokal:

```bash
npm run dev
```

Membangun untuk Produksi:

```bash
npm run build
npm start
```

Struktur Direktori

```bash
app/ - Folder utama untuk Remix, mencakup semua route, komponen, dan logika bisnis.
prisma/ - Folder untuk skema Prisma.
public/ - File statis, seperti gambar dan CSS.
routes/ - Menyimpan semua file route sesuai dengan struktur Remix v2.
```

## Kontribusi

Fork proyek ini.

```bash
Buat branch fitur (git checkout -b feature/NamaFitur).
Commit perubahan (git commit -m 'Menambahkan NamaFitur').
Push ke branch (git push origin feature/NamaFitur).
```

Ajukan pull request.

## Lisensi

Proyek ini dilisensikan di bawah lisensi MIT.
