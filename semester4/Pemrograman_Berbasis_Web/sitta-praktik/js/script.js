/* js/script.js */

// --- Global Utilities ---

// Theme Manager
function initTheme() {}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// --- Fungsi Notifikasi Fitur Belum Tersedia ---
window.fiturBelumTersedia = function(event) {
    event.preventDefault(); // Mencegah browser berpindah halaman/kembali ke atas
    showToast('Fitur ini masih dalam tahap pengembangan.', 'warning');
}

// --- Logika Menu Dropdown Laporan (Hover & Klik) ---
let isDropdownLocked = false; // Menyimpan status apakah menu dikunci (diklik)

// Fungsi saat di-hover (diatur dari atribut HTML onmouseenter/leave)
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

// Toast Notification
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
    
    // Menentukan ikon berdasarkan tipe
    let iconClass = 'bi-check-circle-fill'; // Default (success)
    if (type === 'error') {
        iconClass = 'bi-exclamation-circle-fill';
    } else if (type === 'warning') {
        iconClass = 'bi-exclamation-triangle-fill'; // Ikon peringatan
    }

    toast.innerHTML = `
        <i class="bi ${iconClass}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Modals Logic
window.openModal = function(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

window.closeModal = function(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Authentication Check
function checkAuth(isLoginPage = false) {
    const user = localStorage.getItem('sitta_user');
    if (!user && !isLoginPage) {
        window.location.href = 'index.html';
    } else if (user && isLoginPage) {
        window.location.href = 'dashboard.html';
    }
}

function logout() {
    localStorage.removeItem('sitta_user');
    window.location.href = 'index.html';
}

// --- Page Specific Logic ---

document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    const path = window.location.pathname;
    const isLogin = path.endsWith('index.html') || path.endsWith('/');
    
    checkAuth(isLogin);

    // Event listener untuk tombol Tema di Sidebar
    const themeBtnSidebar = document.getElementById('btn-theme-sidebar');
    if (themeBtnSidebar) {
        themeBtnSidebar.addEventListener('click', toggleTheme);
    }

    // Event listener untuk tombol Logout di Sidebar
    const logoutBtnSidebar = document.getElementById('btn-logout-sidebar');
    if (logoutBtnSidebar) {
        logoutBtnSidebar.addEventListener('click', logout);
    }

    // --- Logika Klik Menu Dropdown Laporan ---
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


    // --- 1. Login Page Logic ---
    if (isLogin) {
        const loginForm = document.getElementById('loginForm');
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validate against data.js
            const user = dataPengguna.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('sitta_user', JSON.stringify(user));
                window.location.href = 'dashboard.html';
            } else {
                showToast('Email atau password yang Anda masukkan salah.', 'error');
            }
        });

        // --- Fitur Toggle Hide/Unhide Password (Tetap Sama) ---
        window.togglePasswordVisibility = function(inputId, iconElement) {
            const inputField = document.getElementById(inputId);
            if (inputField.type === "password") {
                inputField.type = "text";
                iconElement.classList.remove("bi-eye-slash");
                iconElement.classList.add("bi-eye");
            } else {
                inputField.type = "password";
                iconElement.classList.remove("bi-eye");
                iconElement.classList.add("bi-eye-slash");
            }
        }

        // --- Fitur Validasi Password Real-time (Diperbarui) ---
        const regPassword = document.getElementById('regPassword');
        const regPasswordConfirm = document.getElementById('regPasswordConfirm');
        const passwordMatchMsg = document.getElementById('passwordMatchMsg');

        function checkPasswordMatch() {
            // Jika kolom konfirmasi masih KOSONG (belum diketik apa-apa atau dihapus semua)
            if (regPasswordConfirm.value.length === 0) {
                // Kembalikan ke tampilan NORMAL (hapus warna border khusus dan sembunyikan pesan)
                regPasswordConfirm.style.borderColor = ""; // Mengikuti CSS bawaan (.form-control)
                passwordMatchMsg.style.display = "none";
                return; // Hentikan fungsi sampai sini
            }

            // Jika pengguna SUDAH mulai mengetik
            if (regPassword.value === regPasswordConfirm.value) {
                // Jika COCOK: Beri warna hijau dan sembunyikan pesan
                regPasswordConfirm.style.borderColor = "#28a745"; // Hijau
                passwordMatchMsg.style.display = "none";
            } else {
                // Jika BELUM COCOK: Beri warna merah dan tampilkan pesan
                regPasswordConfirm.style.borderColor = "#dc3545"; // Merah
                passwordMatchMsg.style.display = "block";
                passwordMatchMsg.textContent = "Password belum cocok."; // Pesan yang Anda minta
            }
        }

        // Pasang event listener 'input' agar dicek setiap kali ada karakter yang diketik
        if (regPassword) regPassword.addEventListener('input', checkPasswordMatch);
        if (regPasswordConfirm) regPasswordConfirm.addEventListener('input', checkPasswordMatch);
        
        // Logika Pendaftaran Akun Baru Sementara
        const formDaftar = document.getElementById('formDaftar');
        if (formDaftar) {
            formDaftar.addEventListener('submit', (e) => {
                e.preventDefault(); 
                
                const nama = document.getElementById('regNama').value;
                const email = document.getElementById('regEmail').value;
                const password = document.getElementById('regPassword').value;
                const passwordConfirm = document.getElementById('regPasswordConfirm').value; // Ambil nilai konfirmasi
                const lokasi = document.getElementById('regLokasi').value;
                
                // --- Validasi 1: Cek kecocokan password ---
                if (password !== passwordConfirm) {
                    showToast('Password tidak cocok! Silakan ketik ulang.', 'error');
                    return; // Hentikan proses jika tidak sama
                }

                // --- Validasi 2: Cek email ganda ---
                const emailTelahAda = dataPengguna.find(u => u.email === email);
                if (emailTelahAda) {
                    showToast('Email ini sudah terdaftar!', 'error');
                    return; 
                }

                const newUser = {
                    id: dataPengguna.length + 1, 
                    nama: nama,
                    email: email,
                    password: password,
                    role: "UPBJJ-UT", 
                    lokasi: lokasi
                };
                
                dataPengguna.push(newUser);
                
                showToast('Akun berhasil dibuat! Silakan login.', 'success');
                closeModal('modalDaftar');
                formDaftar.reset();
            });
        }
    }

    // --- 2. Dashboard Page Logic ---
    if (path.includes('dashboard.html')) {
        const greetingEl = document.getElementById('greeting-time');
        const userNameEl = document.getElementById('user-name');
        
        // Ambil nama pengguna dari memori
        const user = JSON.parse(localStorage.getItem('sitta_user'));
        if (user && userNameEl) userNameEl.textContent = user.nama;

        // Fungsi untuk mengupdate jam dan ucapan
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

            // Update Angka Jam Digital (dengan tambahan angka '0' jika di bawah 10)
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
                
                // Menggabungkan variabel di atas menjadi format: "Kamis, 15 Oktober 2026"
                dateEl.textContent = `${hari}, ${tanggal} ${bulan} ${tahun}`;
            }
        }

        // Jalankan sekali saat layar dimuat
        updateClock();
        
        // Perintahkan browser untuk memperbarui fungsi ini setiap 1000 milidetik (1 detik)
        setInterval(updateClock, 1000);
    }

    // --- 3. Tracking Page Logic ---
    if (path.includes('tracking.html')) {
        const trackForm = document.getElementById('trackForm');
        
        trackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const noDo = document.getElementById('noDo').value;
            const resultData = dataTracking[noDo];
            const resultContainer = document.getElementById('tracking-result');

            if (resultData) {
                document.getElementById('res-nama').textContent = resultData.nama;
                document.getElementById('res-status').textContent = resultData.status;
                document.getElementById('res-ekspedisi').textContent = resultData.ekspedisi;
                document.getElementById('res-tanggal').textContent = resultData.tanggalKirim;
                document.getElementById('res-total').textContent = resultData.total;
                document.getElementById('res-nodo').textContent = resultData.nomorDO;
                document.getElementById('res-jenis').textContent = resultData.paket;
                
                // Ekspedisi Logo Logic (Dummy)
                const imgEks = document.getElementById('img-ekspedisi');
                if(resultData.ekspedisi.toLowerCase().includes('jne')) {
                    imgEks.src = 'assets/logo-jne.png';
                } else if(resultData.ekspedisi.toLowerCase().includes('pos')) {
                    imgEks.src = 'assets/logo-pos.png';
                } else {
                    imgEks.src = '';
                }

                // Progress Bar Logic
                const bar = document.getElementById('progress-bar');
                
                resultContainer.style.display = 'block';
                bar.style.transition = 'none'; 
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-in-out';
                    
                    if(resultData.status === 'Dalam Perjalanan') {
                        bar.style.width = '50%';
                    } else if(resultData.status === 'Dikirim') {
                        bar.style.width = '100%';
                    } else {
                        bar.style.width = '10%';
                    }
                }, 50);

                // Timeline Logic
                const timelineContainer = document.getElementById('timeline-container');
                timelineContainer.innerHTML = ''; // Clear previous
                
                resultData.perjalanan.forEach(item => {
                    timelineContainer.innerHTML += `
                        <div class="timeline-item">
                            <small class="text-muted">${item.waktu}</small>
                            <p><strong>${item.keterangan}</strong></p>
                        </div>
                    `;
                });

                resultContainer.style.display = 'block';
            } else {
                resultContainer.style.display = 'none';
                showToast('Nomor Delivery Order tidak ditemukan.', 'error');
            }
        });
    }

    // --- 4. Stok Page Logic ---
    if (path.includes('stok.html')) {
        renderStok();

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                // Ambil nilai ketikan, lalu panggil renderStok dengan nilai tersebut
                renderStok(e.target.value); 
            });
        }

        const formTambah = document.getElementById('formTambahStok');
        if (formTambah) {
            formTambah.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const fileInput = document.getElementById('coverBuku');
                let coverData = 'https://via.placeholder.com/60x80.png?text=No+Cover'; // Gambar default jika tidak upload
                
                // Fungsi untuk merangkai dan menyimpan data
                function simpanData(gambarBase64) {
                    const newData = {
                        kodeLokasi: document.getElementById('kodeLokasi').value,
                        kodeBarang: document.getElementById('kodeBarang').value,
                        namaBarang: document.getElementById('namaBarang').value,
                        jenisBarang: document.getElementById('jenisBarang').value,
                        edisi: document.getElementById('edisi').value,
                        stok: parseInt(document.getElementById('stokAwal').value),
                        cover: gambarBase64
                    };
                    dataBahanAjar.push(newData);

                    showToast('Bahan Ajar berhasil ditambahkan', 'success');
                    closeModal('modalTambah');
                    formTambah.reset();
                    renderStok(); // Update tampilan layar
                }

                // Cek apakah user mengupload gambar
                if (fileInput.files && fileInput.files[0]) {
                    const reader = new FileReader();
                    
                    // Setelah gambar selesai dibaca oleh browser
                    reader.onload = function(event) {
                        coverData = event.target.result; // Ini adalah string base64 panjang dari gambar
                        simpanData(coverData);
                    };
                    
                    // Mulai baca file sebagai URL (Base64)
                    reader.readAsDataURL(fileInput.files[0]);
                } else {
                    // Jika tidak upload gambar, langsung simpan pakai gambar default
                    simpanData(coverData);
                }
            });
        }
    }
});

function renderStok(searchQuery = "") {
    const tbody = document.getElementById('stok-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    // Filter dataBahanAjar berdasarkan query pencarian
    // Jika searchQuery kosong (""), filter ini akan meloloskan semua data
    const filteredData = dataBahanAjar.filter(item => {
        const textToSearch = searchQuery.toLowerCase();
        const nama = item.namaBarang.toLowerCase();
        const kode = item.kodeBarang.toLowerCase();
        
        // Return true jika kata kunci ditemukan di nama atau di kode
        return nama.includes(textToSearch) || kode.includes(textToSearch);
    });

    // Jika data tidak ditemukan setelah pencarian
    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="padding: 30px; text-align: center; color: var(--text-muted);">
                    <i class="bi bi-search" style="font-size: 2rem; display: block; margin-bottom: 10px;"></i>
                    Tidak ada bahan ajar yang cocok dengan pencarian <strong>"${searchQuery}"</strong>.
                </td>
            </tr>
        `;
        return; // Hentikan fungsi di sini
    }

    // Mencetak baris tabel dari data yang sudah difilter
    filteredData.forEach(item => {
        const coverSrc = item.cover;

        tbody.innerHTML += `
            <tr>
                <td style="padding: 15px;">
                    <img src="${coverSrc}" alt="Cover ${item.namaBarang}" class="cover-img-table" onerror="this.src='https://via.placeholder.com/60x80.png?text=No+Cover'">
                </td>
                <td style="padding: 15px;">
                    <strong class="text-brand">${item.kodeBarang}</strong><br>
                    <small class="text-muted">${item.kodeLokasi}</small>
                </td>
                <td style="padding: 15px; font-weight: 500;">
                    ${item.namaBarang}
                </td>
                <td style="padding: 15px;">
                    ${item.jenisBarang}<br>
                    <small class="text-muted">Edisi ${item.edisi}</small>
                </td>
                <td style="padding: 15px; text-align: center;">
                    <strong style="font-size: 1.2rem; color: var(--ut-yellow);">${item.stok}</strong>
                </td>
            </tr>
        `;
    });
}