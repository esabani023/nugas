Vue.component('order-form', {
    template: '#tpl-order',
    props: ['paket', 'pengirimanList', 'trackingData'],
    data() {
        return {
            formDO: {
                nim: '',
                nama: '',
                ekspedisi: '',
                paket: '',
                tanggalKirim: new Date().toISOString().split('T')[0]
            }
        };
    },
    computed: {
        generatedDo() {
            const year = new Date().getFullYear();
            const keys = Object.keys(this.trackingData).filter(k => k.startsWith(`DO${year}`));
            const seq = (keys.length + 1).toString().padStart(3, '0');
            return `DO${year}-${seq}`;
        },
        selectedPaketDetail() {
            if (!this.formDO.paket) return null;
            return this.paket.find(p => p.kode === this.formDO.paket);
        }
    },
    methods: {
        simpanDO() {
            if (!this.formDO.nim || !this.formDO.nama || !this.formDO.ekspedisi || !this.formDO.paket) {
                alert('Semua field wajib diisi!');
                return;
            }
            const doNum = this.generatedDo;
            const det = this.selectedPaketDetail;
            const now = new Date();
            const timeStr = now.toISOString().slice(0, 19).replace('T', ' ');

            const newEntry = {
                nim: this.formDO.nim,
                nama: this.formDO.nama,
                status: "Diproses",
                ekspedisi: this.formDO.ekspedisi,
                tanggalKirim: this.formDO.tanggalKirim,
                paket: this.formDO.paket,
                total: det ? det.harga : 0,
                perjalanan: [
                    { waktu: timeStr, keterangan: "Pesanan masuk dan DO diproses." }
                ]
            };
            this.$emit('created', newEntry, doNum);
            this.formDO.nim = '';
            this.formDO.nama = '';
            this.formDO.ekspedisi = '';
            this.formDO.paket = '';
        }
    }
});