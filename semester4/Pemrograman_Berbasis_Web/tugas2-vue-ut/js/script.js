// --- Global Utilities ---
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Ubah Gambar Watermark
    const watermark = document.querySelector('.bg-watermark');
    if (watermark) {
        watermark.src = newTheme === 'dark' 
            ? 'assets/bg-watermark-ut-dark.png' 
            : 'assets/bg-watermark-ut-light.png';
    }
}

function showToast(message, type = 'error') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast glass ${type}`;
    let iconClass = type === 'error' ? 'bi-exclamation-circle-fill' : (type === 'warning' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill');
    toast.innerHTML = `<i class="bi ${iconClass}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
}

window.openModal = function(modalId) { document.getElementById(modalId).style.display = 'flex'; }
window.closeModal = function(modalId) { document.getElementById(modalId).style.display = 'none'; }
window.fiturBelumTersedia = function(event) { event.preventDefault(); showToast('Fitur ini masih dalam tahap pengembangan.', 'warning'); }

function checkAuth(isLoginPage = false) {
    const user = localStorage.getItem('sitta_user');
    if (!user && !isLoginPage) window.location.href = 'login.html';
    else if (user && isLoginPage) window.location.href = 'index.html'; // Redirect ke Dashboard baru
}

function logout() {
    localStorage.removeItem('sitta_user');
    window.location.href = 'login.html';
}
// Logika Menu Dropdown Laporan (Hover & Klik)
let isDropdownLocked = false; // Menyimpan status apakah menu dikunci (diklik)

// Fungsi saat di-hover
window.hoverDropdown = function(isHovering) {
    const dropdownContainer = document.querySelector('.dropdown-container');
    
    // Jika sedang terkunci (diklik), abaikan efek hover (jangan sembunyikan)
    if (isDropdownLocked) return;

    if (dropdownContainer) {
        if (isHovering) {
            dropdownContainer.classList.add('show');
        } else {
            dropdownContainer.classList.remove('show');
        }
    }
}

// --- Page Specific Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isLogin = path.endsWith('login.html') || path.endsWith('/');
    
    checkAuth(isLogin);

    // Ubah Gambar Watermark
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const watermark = document.querySelector('.bg-watermark');
    if (watermark) {
        watermark.src = currentTheme === 'dark' 
            ? 'assets/bg-watermark-ut-dark.png' 
            : 'assets/bg-watermark-ut-light.png';
    }

    // Sidebar Utilities
    const themeBtnSidebar = document.getElementById('btn-theme-sidebar');
    if (themeBtnSidebar) themeBtnSidebar.addEventListener('click', toggleTheme);
    const logoutBtnSidebar = document.getElementById('btn-logout-sidebar');
    if (logoutBtnSidebar) logoutBtnSidebar.addEventListener('click', logout);

    // Logika Halaman Login
    if (isLogin) {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const user = dataPengguna.find(u => u.email === email && u.password === password);

                if (user) {
                    localStorage.setItem('sitta_user', JSON.stringify(user));
                    window.location.href = 'index.html'; // Pindah ke Dashboard
                } else {
                    showToast('Email atau password salah.', 'error');
                }
            });
        }

        window.togglePasswordVisibility = function(inputId, iconElement) {
            const inputField = document.getElementById(inputId);
            if (inputField.type === "password") {
                inputField.type = "text";
                iconElement.classList.replace("bi-eye-slash", "bi-eye");
            } else {
                inputField.type = "password";
                iconElement.classList.replace("bi-eye", "bi-eye-slash");
            }
        }
    }

    // Logika Klik Menu Dropdown Laporan
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContainer = document.querySelector('.dropdown-container');
    
    if (dropdownBtn && dropdownContainer) {
        dropdownBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            isDropdownLocked = !isDropdownLocked; 
            
            if (isDropdownLocked) {
                dropdownContainer.classList.add('show');
                dropdownBtn.classList.add('active'); 
            } else {
                dropdownContainer.classList.remove('show');
                dropdownBtn.classList.remove('active'); 
            }
        });
    }

    // Logika Halaman Dashboard
    if (path.includes('index.html')) {
        const greetingEl = document.getElementById('greeting-time');
        const userNameEl = document.getElementById('user-name');
        
        const user = JSON.parse(localStorage.getItem('sitta_user'));
        if (user && userNameEl) userNameEl.textContent = user.nama;

        function updateClock() {
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();
            const second = now.getSeconds();

            // Update Sapaan Waktu
            let greeting = 'Selamat pagi';
            if (hour >= 11 && hour < 15) greeting = 'Selamat siang';
            else if (hour >= 15 && hour < 18) greeting = 'Selamat sore';
            else if (hour >= 18) greeting = 'Selamat malam';
            
            if (greetingEl) greetingEl.textContent = greeting;

            // Update Angka Jam Digital
            const clockH = document.getElementById('clock-hours');
            const clockM = document.getElementById('clock-minutes');
            const clockS = document.getElementById('clock-seconds');
            
            if (clockH && clockM && clockS) {
                clockH.textContent = hour.toString().padStart(2, '0');
                clockM.textContent = minute.toString().padStart(2, '0');
                clockS.textContent = second.toString().padStart(2, '0');
            }

            // Update Tanggal Format Indonesia
            const dateEl = document.getElementById('current-date');
            if (dateEl) {
                const namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                
                const hari = namaHari[now.getDay()];
                const tanggal = now.getDate();
                const bulan = namaBulan[now.getMonth()];
                const tahun = now.getFullYear();
                
                dateEl.textContent = `${hari}, ${tanggal} ${bulan} ${tahun}`;
            }
        }
        updateClock();
        setInterval(updateClock, 1000);
    }
});