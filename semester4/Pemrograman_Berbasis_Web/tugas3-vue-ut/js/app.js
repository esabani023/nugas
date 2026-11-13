document.addEventListener('DOMContentLoaded', async () => {

    try {
        // Memuat semua template
        await ApiService.muatTemplates([
            { id: "tpl-stock", path: "templates/stock-table.html" },
            { id: "tpl-badge", path: "templates/status-badge.html" },
            { id: "tpl-tracking", path: "templates/do-tracking.html" },
            { id: "tpl-order", path: "templates/order-form.html" },
            { id: "tpl-modal", path: "templates/app-modal.html" }
        ]);
    } catch (err) {
        console.error("Gagal memuat template:", err);
        if (typeof window.showToast === 'function') {
            window.showToast("Gagal memuat template aplikasi.", "error");
        }
    }

    const rawData = await ApiService.fetchData();
    if (!rawData) return;

    // Global Filters
    Vue.filter('currency', function(val) {
        if (!val && val !== 0) return 'Rp 0,-';
        return 'Rp ' + new Intl.NumberFormat('id-ID').format(val) + ',-';   
    });
    Vue.filter('satuanBuah', function(val) {
        if (!val && val !== 0) return '0 buah';
        return val + ' buah';
    });

    new Vue({
        el: '#app',
        data: {
            tab: 'dashboard', // Default tab dashboard
            userName: 'Pengguna',
            greetingTime: 'Selamat pagi',
            clockH: '00',
            clockM: '00',
            clockS: '00',
            currentDateText: '',
            dropdownLocked: false,
            dropdownHover: false,
            state: {
                stok: rawData.stok,
                tracking: rawData.tracking,
                paket: rawData.paket,
                pengirimanList: rawData.pengirimanList,
                upbjjList: rawData.upbjjList,
                kategoriList: rawData.kategoriList
            }
        },
        mounted() {
            const user = JSON.parse(localStorage.getItem('sitta_user'));
            if (user && user.nama) this.userName = user.nama;
            
            this.updateClock();
            setInterval(this.updateClock, 1000);
        },
        methods: {
            toggleTheme() {
                if (typeof window.toggleTheme === 'function') {
                    window.toggleTheme();
                }
            },
            logout() {
                localStorage.removeItem('sitta_user');
                window.location.href = 'login.html';
            },
            updateClock() {
                const now = new Date();
                const hour = now.getHours();
                const minute = now.getMinutes();
                const second = now.getSeconds();

                if (hour >= 5 && hour < 11) this.greetingTime = 'Selamat pagi';
                else if (hour >= 11 && hour < 15) this.greetingTime = 'Selamat siang';
                else if (hour >= 15 && hour < 18) this.greetingTime = 'Selamat sore';
                else this.greetingTime = 'Selamat malam';

                this.clockH = hour.toString().padStart(2, '0');
                this.clockM = minute.toString().padStart(2, '0');
                this.clockS = second.toString().padStart(2, '0');

                const namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                
                this.currentDateText = `${namaHari[now.getDay()]}, ${now.getDate()} ${namaBulan[now.getMonth()]} ${now.getFullYear()}`;
            },
            handleOpenModal(mode, item, index) {
                this.$refs.modal.open(mode, item, index, this.state.upbjjList, this.state.kategoriList);
            },
            handleConfirmDelete(kode) {
                this.$refs.modal.openDelete(kode);
            },
            handleSaveStock(formData, isEdit, editIndex) {
                if (isEdit) {
                    this.state.stok.splice(editIndex, 1, formData);
                    if (typeof showToast === 'function') showToast('Data berhasil diperbarui', 'success');
                } else {
                    this.state.stok.push(formData);
                    if (typeof showToast === 'function') showToast('Data baru berhasil ditambahkan', 'success');
                }
            },
            handleDeleteStock(kode) {
                const idx = this.state.stok.findIndex(i => i.kode === kode);
                if (idx !== -1) {
                    this.state.stok.splice(idx, 1);
                    if (typeof showToast === 'function') showToast('Data berhasil dihapus', 'success');
                }
            },
            handleCreatedDO(newEntry, doNum) {
                this.$set(this.state.tracking, doNum, newEntry);
                if (typeof showToast === 'function') showToast('DO Baru berhasil dibuat dengan nomor ' + doNum, 'success');
                this.tab = 'tracking';
            }
        }
    });
});
