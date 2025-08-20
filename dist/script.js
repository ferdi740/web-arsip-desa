"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Menunggu seluruh halaman HTML dimuat
document.addEventListener('DOMContentLoaded', () => {
    // === FITUR DARK MODE ===
    // Beri tahu TS bahwa ini adalah sebuah Tombol HTML
    const modeToggleButton = document.getElementById('mode-toggle');
    const bodyElement = document.body;
    const toggleMode = () => {
        bodyElement.classList.toggle('dark-mode');
    };
    modeToggleButton.addEventListener('click', toggleMode);
    // === FITUR FETCH DATA APARATUR DESA ===
    const fetchAparatur = () => __awaiter(void 0, void 0, void 0, function* () {
        // Beri tahu TS bahwa ini adalah sebuah elemen div
        const container = document.getElementById('aparatur-container');
        container.innerHTML = "<p>Memuat data aparatur...</p>";
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/users?_limit=6');
            if (!response.ok) {
                throw new Error(`Terjadi masalah: ${response.status}`);
            }
            // Terapkan blueprint 'User' ke data yang kita fetch
            const users = yield response.json();
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
        }
        catch (error) {
            container.innerHTML = `<p>Gagal memuat data. Silakan coba lagi nanti.</p>`;
            console.error("Gagal mengambil data:", error);
        }
    });
    fetchAparatur();
});
//# sourceMappingURL=script.js.map