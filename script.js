// Menunggu seluruh halaman HTML dimuat
document.addEventListener('DOMContentLoaded', () => { // Menggunakan Arrow Function!

    // === FITUR DARK MODE (REFACTORED) ===

    const modeToggleButton = document.getElementById('mode-toggle');
    const bodyElement = document.body;

    // Menggunakan Arrow Function untuk event handler yang lebih singkat
    const toggleMode = () => {
        bodyElement.classList.toggle('dark-mode');
    };

    modeToggleButton.addEventListener('click', toggleMode);


    // === FITUR BARU: FETCH DATA APARATUR DESA ===

    // 1. Buat sebuah fungsi async untuk mengambil dan menampilkan data
    const fetchAparatur = async () => {
        // Ambil elemen wadah dari HTML
        const container = document.getElementById('aparatur-container');
        // Tampilkan pesan loading
        container.innerHTML = "<p>Memuat data aparatur...</p>";

        try {
            // 2. Gunakan 'await' untuk menunggu hasil dari 'fetch'
            // Kita ambil 6 user saja dari API sebagai contoh
            const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=6');
            
            // Periksa jika responsenya tidak oke (misal: error 404)
            if (!response.ok) {
                throw new Error(`Terjadi masalah: ${response.status}`);
            }

            // 3. Gunakan 'await' lagi untuk mengubah response menjadi JSON
            const users = await response.json();
            
            // Kosongkan pesan loading
            container.innerHTML = "";

            // 4. Loop setiap user dan tampilkan di halaman
            users.forEach(user => {
                // 5. Gunakan Destructuring untuk mengambil data yang kita butuhkan
                const { name, email, company } = user;

                // Buat elemen HTML baru untuk setiap user
                const userCard = document.createElement('div');
                userCard.className = 'aparatur-card'; // Beri kelas CSS

                // Isi kartu dengan data user
                userCard.innerHTML = `
                    <h3>${name}</h3>
                    <p>${company.name}</p>
                    <p>${email}</p>
                `;

                // Masukkan kartu user ke dalam wadah
                container.appendChild(userCard);
            });

        } catch (error) {
            // Jika terjadi error saat fetch (misal: tidak ada internet)
            // Tampilkan pesan error di wadah
            container.innerHTML = `<p>Gagal memuat data. Silakan coba lagi nanti.</p>`;
            console.error("Gagal mengambil data:", error);
        }
    };

    // 6. Panggil fungsi tersebut agar langsung berjalan saat halaman dimuat
    fetchAparatur();

});