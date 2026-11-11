Vue.component('app-modal', {
    template: '#tpl-modal',
    data() {
        return {
            isOpen: false,
            isEdit: false,
            editIndex: -1,
            form: { kode: '', judul: '', upbjj: 'Jakarta', kategori: 'MK Wajib', lokasiRak: '', harga: 0, qty: 0, safety: 0, catatanHTML: '' },
            listUpbjj: [],
            listKategori: [],
            isDeleteMode: false,
            kodeHapus: ''
        };
    },
    methods: {
        open(mode, data = null, index = -1, upbjjList = [], katList = []) {
            this.listUpbjj = upbjjList;
            this.listKategori = katList;
            this.isDeleteMode = false;
            this.isOpen = true;
            this.isEdit = (mode === 'edit');
            if (this.isEdit && data) {
                this.editIndex = index;
                this.form = { ...data };
            } else {
                this.form = { kode: '', judul: '', upbjj: upbjjList[0] || 'Jakarta', kategori: katList[0] || 'MK Wajib', lokasiRak: '', harga: 0, qty: 0, safety: 0, catatanHTML: '' };
            }
        },
        openDelete(kode) {
            this.isDeleteMode = true;
            this.isOpen = true;
            this.kodeHapus = kode;
        },
        close() {
            this.isOpen = false;
        },
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