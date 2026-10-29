/* js/stok-app.js */
var app = new Vue({
    el: '#app',
    data: {
        stok: stok, // Diambil dari dataBahanAjar.js
        listUpbjj: upbjjList,
        listKategori: kategoriList,
        
        // Data Model Filter
        filterSearch: '',
        activeSearchKeyword: '',
        typingTimer: null,
        filterUpbjj: '',
        filterKategori: '',
        filterWarning: false,
        sortBy: 'judul',

        // Data Modal Form
        isModalBuka: false,
        isEditMode: false,
        editIndex: -1,
        formStok: { kode: '', judul: '', upbjj: '', harga: 0, qty: 0, safety: 0, catatanHTML: '', harga: 0, kategori: 'MK Wajib', lokasiRak: 'R0-00' },
        isModalHapusBuka: false,
        itemYangAkanDihapus: null
    },
    computed: {
        filteredStok() {
            let result = this.stok;

            // Filter Pencarian Teks
            if (this.activeSearchKeyword) {
                const keyword = this.activeSearchKeyword.toLowerCase();
                result = result.filter(item => 
                    item.judul.toLowerCase().includes(keyword) || 
                    item.kode.toLowerCase().includes(keyword)
                );
            }

            // Filter UT Daerah
            if (this.filterUpbjj) {
                result = result.filter(item => item.upbjj === this.filterUpbjj);
            }

            // Filter Kategori (hanya jalan jika UT Daerah terisi)
            if (this.filterUpbjj && this.filterKategori) {
                result = result.filter(item => item.kategori === this.filterKategori);
            }

            // Filter Re-Order (Stok < Safety)
            if (this.filterWarning) {
                result = result.filter(item => item.qty < item.safety);
            }

            // Sorting Logics
            if (this.sortBy === 'judul') {
                result = result.sort((a, b) => a.judul.localeCompare(b.judul));
            } else if (this.sortBy === 'qty') {
                result = result.sort((a, b) => a.qty - b.qty);
            } else if (this.sortBy === 'harga') {
                result = result.sort((a, b) => a.harga - b.harga);
            }

            return result;
        }
    },
    watch: {
        // Watcher memantau jika ada pencarian dan filter dropdown yang berubah
        filterSearch(newVal) {
            clearTimeout(this.typingTimer);
            this.typingTimer = setTimeout(() => {
                this.activeSearchKeyword = newVal; 
            }, 1000);
        },
        filterUpbjj(newVal) {
            if (!newVal) this.filterKategori = ''; // Auto-reset kategori jika UPBJJ dikosongkan
            this.showToast('Filter UT Daerah diterapkan', 'success');
        },
        filterWarning(newVal) {
            if (newVal) this.showToast('Menampilkan data Re-Order', 'warning');
        }
    },
    methods: {
        formatRupiah(angka) {
            if (!angka) return '0';
            return new Intl.NumberFormat('id-ID').format(angka);
        },
        resetFilter() {
            this.filterSearch = '';
            this.activeSearchKeyword = '';
            this.filterUpbjj = '';
            this.filterKategori = '';
            this.filterWarning = false;
            this.sortBy = 'judul';
            this.showToast('Filter dikembalikan ke pengaturan awal', 'success');
        },
        bukaModal(mode, data = null, index = -1) {
            this.isEditMode = (mode === 'edit');
            this.isModalBuka = true;
            if (this.isEditMode) {
                this.editIndex = index;
                // Copy data (Cloning object) agar tidak terubah langsung di tabel sebelum disubmit
                this.formStok = { ...data };
            } else {
                this.formStok = { kode: '', judul: '', upbjj: '', harga: 0, qty: 0, safety: 0, catatanHTML: '-', harga: 0, kategori: 'MK Wajib', lokasiRak: 'R0-00' };
            }
        },
        simpanData() {
            this.formStok.harga = parseInt(this.formStok.harga) || 0;
            
            if (this.isEditMode) {
                this.stok.splice(this.editIndex, 1, { ...this.formStok });
                this.showToast('Data berhasil diperbarui', 'success');
            } else {
                this.stok.push({ ...this.formStok });
                this.showToast('Data baru berhasil ditambahkan', 'success');
            }
            this.isModalBuka = false;
        },
        konfirmasiHapus(kodeBuku) {
            this.itemYangAkanDihapus = kodeBuku;
            this.isModalHapusBuka = true;
        },
        eksekusiHapus() {
            if (this.itemYangAkanDihapus) {
                const indexAsli = this.stok.findIndex(item => item.kode === this.itemYangAkanDihapus);
                if (indexAsli !== -1) {
                    this.stok.splice(indexAsli, 1);
                    this.showToast('Data berhasil dihapus', 'success');
                }
            }
            this.tutupModalHapus();
        },
        tutupModalHapus() {
            this.isModalHapusBuka = false;
            this.itemYangAkanDihapus = null;
        },
        toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        },
        showToast(message, type) {
            let container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = `toast glass ${type}`;
            toast.innerHTML = `<i class="bi bi-info-circle-fill"></i><span>${message}</span>`;
            container.appendChild(toast);
            setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
        }
    }
});