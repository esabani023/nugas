// --- Global Utilities & Theme Handler ---
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const watermark = document.querySelector('.bg-watermark');
    if (watermark) {
        watermark.src = newTheme === 'dark' 
            ? 'assets/img/bg-watermark-ut-dark.png' 
            : 'assets/img/bg-watermark-ut-light.png';
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

window.openModal = function(modalId) { 
    const el = document.getElementById(modalId);
    if (el) el.style.display = 'flex'; 
}
window.closeModal = function(modalId) { 
    const el = document.getElementById(modalId);
    if (el) el.style.display = 'none'; 
}
window.fiturBelumTersedia = function(event) { 
    if (event) event.preventDefault(); 
    showToast('Fitur ini masih dalam tahap pengembangan.', 'warning'); 
}

function checkAuth(isLoginPage = false) {
    const user = localStorage.getItem('sitta_user');
    if (!user && !isLoginPage) {
        window.location.href = 'login.html';
    } else if (user && isLoginPage) {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem('sitta_user');
    window.location.href = 'login.html';
}

let isDropdownLocked = false;
window.hoverDropdown = function(isHovering) {
    const dropdownContainer = document.querySelector('.dropdown-container');
    if (isDropdownLocked) return;
    if (dropdownContainer) {
        if (isHovering) dropdownContainer.classList.add('show');
        else dropdownContainer.classList.remove('show');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isLogin = path.endsWith('login.html');
    
    checkAuth(isLogin);

    // Initial Watermark Check
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const watermark = document.querySelector('.bg-watermark');
    if (watermark) {
        watermark.src = currentTheme === 'dark' 
            ? 'assets/img/bg-watermark-ut-dark.png' 
            : 'assets/img/bg-watermark-ut-light.png';
    }

    // Sidebar Utilities
    const themeBtnSidebar = document.getElementById('btn-theme-sidebar');
    if (themeBtnSidebar) themeBtnSidebar.addEventListener('click', toggleTheme);
    
    // Login Page Specific
    if (isLogin) {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const user = typeof dataPengguna !== 'undefined' ? dataPengguna.find(u => u.email === email && u.password === password) : null;

                if (user) {
                    localStorage.setItem('sitta_user', JSON.stringify(user));
                    window.location.href = 'index.html';
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

    // Dropdown Laporan Toggle
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
});
