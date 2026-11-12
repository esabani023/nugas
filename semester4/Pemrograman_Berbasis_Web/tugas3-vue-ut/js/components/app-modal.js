Vue.component('app-modal', function(resolve, reject) {
    fetch('templates/app-modal.html')
        .then(res => res.text())
        .then(htmlTemplate => {
            resolve({
                template: htmlTemplate,
                data() {
                    return {
                        isOpen: false, isEdit: false, editIndex: -1,
                        form: { kode: '', judul: '', upbjj: 'Jakarta', kategori: 'MK Wajib', lokasiRak: '', harga: '', qty: '', safety: '', catatanHTML: '' },
                        listUpbjj: [], listKategori: [], isDeleteMode: false, kodeHapus: ''
                    };
                },
                mounted() {
                    document.addEventListener('keydown', this.handleKeydown);
                },
                beforeDestroy() {
                    document.removeEventListener('keydown', this.handleKeydown);
                },
                methods: {
                    handleKeydown(e) {
                        if (e.key === 'Escape' && this.isOpen) {
                            this.close();
                        }
                    },
                    open(mode, data = null, index = -1, upbjjList = [], katList = []) {
                        this.listUpbjj = upbjjList; this.listKategori = katList;
                        this.isDeleteMode = false; this.isOpen = true; this.isEdit = (mode === 'edit');
                        if (this.isEdit && data) {
                            this.editIndex = index; this.form = { ...data };
                        } else {
                            this.form = { kode: '', judul: '', upbjj: upbjjList[0] || 'Jakarta', kategori: katList[0] || 'MK Wajib', lokasiRak: '', harga: '', qty: '', safety: '', catatanHTML: '' };
                        }
                    },
                    openDelete(kode) {
                        this.isDeleteMode = true; this.isOpen = true; this.kodeHapus = kode;
                    },
                    close() { this.isOpen = false; },
                    submitForm() {
                        this.form.harga = parseInt(this.form.harga) || 0;
                        this.form.qty = parseInt(this.form.qty) || 0;
                        this.form.safety = parseInt(this.form.safety) || 0;
                        this.$emit('save-stock', { ...this.form }, this.isEdit, this.editIndex);
                        this.close();
                    },
                    confirmDelete() {
                        this.$emit('delete-stock', this.kodeHapus);
                        this.close();
                    }
                }
            });
        }).catch(err => reject(err));
});