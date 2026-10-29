/* js/tracking-app.js */
var app = new Vue({
    el: '#app',
    data: {
        databaseDO: tracking, // Diambil dari dataBahanAjar.js
        listPengiriman: pengirimanList,
        listPaket: paket,
        
        searchString: '',
        resultInfo: null,
        activeDO: '',
        progressBarWidth: '0%',

        isFormBuka: false,
        formDO: { nim: '', nama: '', ekspedisi: '', paket: '', tanggalKirim: new Date().toISOString().split('T')[0] }
    },
    computed: {
        // Logika Auto-Generate Nomor DO
        generatedDo() {
            const year = new Date().getFullYear();
            // Ekstrak semua keys, cari angka tertinggi, lalu + 1
            const keys = Object.keys(this.databaseDO);
            const total = keys.length + 1;
            // Format 3 digit berurut (001, 002)
            const sequence = total.toString().padStart(3, '0');
            return `DO${year}-${sequence}`;
        },
        // Logika Detail Paket Otomatis berdasarkan Pilihan Dropdown
        selectedPaketDetail() {
            if (!this.formDO.paket) return null;
            return this.listPaket.find(p => p.kode === this.formDO.paket);
        }
    },
    watch: {
        // Watcher 2: Pemantauan Karakter Cerdas
        searchString(newVal) {
            // Jika user mengetik minimal 10 karakter (contoh: DO2025-001), auto-pencarian tanpa menekan Enter!
            if (newVal && newVal.length >= 10) {
                this.cariDO();
            } else {
                this.resultInfo = null; // Sembunyikan hasil jika kurang
            }
        }
    },
    methods: {
        formatRupiah(angka) {
            if (!angka) return '0';
            return new Intl.NumberFormat('id-ID').format(angka);
        },
        
        formatTanggal(tanggal) {
            if (!tanggal) return '-';
            const dateObj = new Date(tanggal);
            return dateObj.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        },

        cariDO() {
            const key = this.searchString.trim();
            if (this.databaseDO[key]) {
                this.activeDO = key;
                this.resultInfo = this.databaseDO[key];
                
                // Animasi Progress Bar
                this.progressBarWidth = '0%';
                setTimeout(() => {
                    if (this.resultInfo.status.includes('Perjalanan')) {
                        this.progressBarWidth = '50%';
                    } else if (this.resultInfo.status === 'Dikirim') {
                        this.progressBarWidth = '100%';
                    } else {
                        this.progressBarWidth = '20%';
                    }
                }, 50);
            } else {
                this.resultInfo = null;
                this.showToast('Nomor DO tidak ditemukan', 'error');
            }
        },
        simpanDO() {
            // Menyiapkan Objek Baru
            const newDoNumber = this.generatedDo;
            const det = this.selectedPaketDetail;

            const now = new Date();
            const tahun = now.getFullYear();
            const bulan = String(now.getMonth() + 1).padStart(2, '0');
            const hari = String(now.getDate()).padStart(2, '0');
            const jam = String(now.getHours()).padStart(2, '0');
            const menit = String(now.getMinutes()).padStart(2, '0');
            const detik = String(now.getSeconds()).padStart(2, '0');
            
            const timelinePengiriman = `${tahun}-${bulan}-${hari} ${jam}:${menit}:${detik}`;
            
            const newEntry = {
                nim: this.formDO.nim,
                nama: this.formDO.nama,
                status: "Diproses",
                ekspedisi: this.formDO.ekspedisi,
                tanggalKirim: this.formDO.tanggalKirim,
                paket: this.formDO.paket,
                total: det ? det.harga : 0,
                perjalanan: [
                    { waktu: timelinePengiriman, keterangan: "Pesanan masuk dan DO diproses." }
                ]
            };

            // Masukkan ke Objek Tracking (Karena Object, bukan Array Push)
            this.$set(this.databaseDO, newDoNumber, newEntry);
            
            this.showToast('DO Baru berhasil dibuat dengan nomor ' + newDoNumber, 'success');
            
            // Auto Reset Form
            this.formDO.nim = '';
            this.formDO.nama = '';
            this.isFormBuka = false;
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