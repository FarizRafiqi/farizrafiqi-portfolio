# Plan Implementasi Portfolio Fariz Rafiqi

## Tujuan

Memperbarui portfolio agar Featured Projects menampilkan proyek yang benar-benar dikerjakan di Solusi Teknologi Kreatif, dengan deskripsi yang menarik untuk HR dan berdasarkan kontribusi nyata yang dapat diverifikasi dari commit history.

## Scope utama

1. Ganti proyek Featured Projects lama:
   - Madina Inventory
   - Ankersal App
   - VR Javanese Dance Visualization
   - DoyanEat
   - Workfrom

2. Tampilkan proyek berikut:
   - Satria Muda Indonesia
   - Satria Muda Landing
   - Hemdal — mencakup `sentiment-analysis-portal-v2` dan `sentiment-analysis` sebagai backend
   - Knowledge Base
   - Smart Booking Room

3. Untuk setiap proyek, siapkan sedikitnya tiga gambar/screenshot yang bersih dan relevan. Hilangkan artefak development tool yang terlihat di sudut gambar, termasuk logo Next.js atau overlay lain yang tidak merepresentasikan produk.

4. Satria Muda harus menampilkan screenshot dashboard setelah login menggunakan akun superadmin dari seeder, serta tampilan penting lain seperti aktivitas atau pengelolaan event bila tersedia.

5. Hemdal harus mencakup screenshot landing page selain screenshot portal/aplikasinya.

6. Jika aplikasi tidak dapat dijalankan, gunakan fallback dari desain Figma atau visual pendukung yang tetap merepresentasikan fitur produk.

## Sumber verifikasi proyek

- Buka dan jalankan proyek satu per satu.
- Lakukan `git pull` pada setiap repository sebelum mengambil screenshot.
- Gunakan worktree terpisah jika memungkinkan agar dependency, environment, database, dan port antarproyek tidak saling bertabrakan.
- Tinjau commit history dengan username `rafiqi.stk` atau nama `Aulia El Ihza Fariz Rafiqi`.
- Masukkan hanya kontribusi yang substantif atau menarik; kontribusi kecil/receh tidak perlu ditampilkan.
- Deskripsi harus menjelaskan dampak, fitur, alur pengguna, atau problem teknis yang diselesaikan—bukan sekadar daftar teknologi.

## Referensi desain fallback

- Satria Muda: https://www.figma.com/design/cwDrLB58xcsQ1oBtoxZabz/PPS-SMI-STK-Design?node-id=9690-491149&m=dev
- Hemdal/Sentiment Analysis:
  - https://www.figma.com/design/dKwuyKWAxzXTzz4ifZbfLB/Sentimen-Analysis---Hemdal-STK?m=auto&t=TuMAVHNiBEMztZoX-6
  - https://www.figma.com/design/B5iaXmrrG3bxzF3S5KcZll/Sentimen-Analysis---Hemdal?m=auto&t=TuMAVHNiBEMztZoX-6
- Smart Booking Room: https://www.figma.com/design/amCswar2FPVOJMYcOV2eH3/Smart-Monitor---Booking-Room-DPR---STK?m=auto&t=TuMAVHNiBEMztZoX-6

Figma MCP menjadi pilihan utama untuk mengambil referensi/render desain. Jika tidak tersedia, gunakan fallback visual lokal yang dibuat konsisten dengan tampilan portfolio.

## Konten portfolio

- Jangan membuat Featured Projects terlalu STK-sentris.
- Gunakan subtitle:
  - EN: `A collection of my recent work and personal experiments.`
  - ID: `Koleksi pekerjaan terbaru dan eksperimen pribadi saya`
- Jangan gunakan kalimat positioning yang secara eksplisit menjadikan STK sebagai fokus utama section.
- Pertahankan kategori/tab hanya jika membantu navigasi dan tidak terasa seperti pengelompokan “STK / Freelance / Personal-Academic”. Jika tidak memberikan manfaat yang jelas, gunakan satu daftar Featured Projects yang rapi.
- Hapus tech stack berikut dari tampilan proyek:
  - WebSocket
  - OpenAI
  - OpenAI-compatible API
  - OpenID/OIDC
  - i18n
- `Socket.IO` hanya dipertahankan jika memang relevan dan masih digunakan.

## Timeline dan years experienced

- Solusi Teknologi Kreatif berakhir pada September 2026.
- Tampilkan periode STK sebagai `09/2025 – 09/2026`, bukan pekerjaan yang sedang berjalan.
- Siapkan dua angka pengalaman:
  - Profesional: hanya freelance dan pengalaman perusahaan/STK; internship tidak dihitung kecuali diputuskan relevan berdasarkan konteks karier.
  - Journey/non-professional: boleh mencakup pengalaman belajar, internship, eksperimen, dan aktivitas lain.
- Pastikan label dan copy menjelaskan perbedaan kedua angka tersebut secara natural.

## Hero dan 3D object

- Audit hero yang sekarang, khususnya 3D object, kualitas visual, responsivitas, dan performa.
- Jika aman dan sejalan dengan desain, perbaiki object dengan Three.js.
- Prioritaskan solusi ringan: optimasi asset/animasi dan visual lokal terlebih dahulu.
- Gunakan provider gratis eksternal hanya jika diperlukan, aman, dan hasilnya dapat disimpan serta dipelihara secara lokal.

## Chatbot

- Audit alur chatbot di halaman portfolio dan perbaiki error yang ditemukan.
- Endpoint harus dapat menerima konfigurasi 9Router yang menunjuk ke origin, `/v1`, atau URL lengkap `/v1/chat/completions`.
- Codex OAuth, Antigravity, dan Google auth dikonfigurasi di 9Router; credential rahasia tidak boleh masuk repository atau file portfolio.
- Sediakan fallback error yang jelas saat provider tidak tersedia.
- Composio boleh digunakan untuk integrasi yang diperlukan, tetapi API key hanya melalui environment/secret manager dan tidak pernah di-commit.

## Sanity Studio

- Identifikasi lebih dulu apakah data Featured Projects, experience, atau asset portfolio dikelola melalui Sanity.
- Jika iya, ubah schema/query/content di Sanity hanya bila memang diperlukan oleh implementasi.
- Hindari duplikasi sumber data: tentukan apakah konten final berasal dari Sanity atau data lokal, lalu dokumentasikan keputusan tersebut.

## Validasi

- Jalankan type-check dan lint pada file yang diubah.
- Jalankan build production sejauh environment mengizinkan.
- Cek seluruh Featured Projects pada desktop dan mobile.
- Pastikan setiap proyek memiliki minimal tiga gambar, alt text, urutan yang benar, dan tidak ada overlay development tool.
- Uji chatbot dengan provider yang tersedia dan kondisi provider gagal.
- Verifikasi tidak ada credential, file sementara, screenshot mentah, atau worktree yang ikut ter-commit.
- Catat kegagalan environment yang bukan akibat perubahan portfolio, misalnya kebutuhan environment Sanity.

## Git delivery

1. Kerjakan pada branch baru khusus perubahan portfolio.
2. Review diff dan status repository.
3. Commit dengan pesan yang jelas.
4. Push branch ke remote.
5. Buat Pull Request dengan ringkasan perubahan, screenshot/asset yang ditambahkan, hasil validasi, dan catatan known issue.

## Status saat plan dibuat

- Branch kerja: `feat/stk-projects-chatbot-redesign`
- Perubahan utama portfolio, asset visual, chatbot, timeline, dan tech stack sedang/ telah dikerjakan.
- Sebelum delivery final, lakukan review ulang terhadap diff terbaru, status git, validasi, commit, push, dan PR.
