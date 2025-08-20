// Definisikan 'blueprint' untuk data User dari API
interface User {
    name: string;
    email: string;
    company: {
        name: string;
    };
}

// Menunggu seluruh halaman HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // === FITUR DARK MODE ===
    
    // Beri tahu TS bahwa ini adalah sebuah Tombol HTML
    const modeToggleButton = document.getElementById('mode-toggle') as HTMLButtonElement;
    const bodyElement: HTMLElement = document.body;

    const toggleMode = (): void => { // :void berarti fungsi ini tidak mengembalikan nilai apa pun
        bodyElement.classList.toggle('dark-mode');
    };

    modeToggleButton.addEventListener('click', toggleMode);

    // === FITUR FETCH DATA APARATUR DESA ===

    const fetchAparatur = async (): Promise<void> => { // Fungsi ini juga tidak mengembalikan nilai
        
        // Beri tahu TS bahwa ini adalah sebuah elemen div
        const container = document.getElementById('aparatur-container') as HTMLDivElement;
        container.innerHTML = "<p>Memuat data aparatur...</p>";

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=6');
            if (!response.ok) {
                throw new Error(`Terjadi masalah: ${response.status}`);
            }
            
            // Terapkan blueprint 'User' ke data yang kita fetch
            const users: User[] = await response.json();
            
            container.innerHTML = "";

            users.forEach(user => {
                const { name, email, company } = user; // Destructuring tetap aman karena TS tahu bentuk 'user'
                const userCard = document.createElement('div');
                userCard.className = 'aparatur-card';
                userCard.innerHTML = `
                    <h3>${name}</h3>
                    <p>${company.name}</p>
                    <p>${email}</p>
                `;
                container.appendChild(userCard);
            });

        } catch (error) {
            container.innerHTML = `<p>Gagal memuat data. Silakan coba lagi nanti.</p>`;
            console.error("Gagal mengambil data:", error);
        }
    };

    fetchAparatur();
});