Vue.component('order-form', {
    template: '#tpl-order',
    props: ['paket', 'pengirimanList', 'trackingData'],
    data() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return {
            formDO: {
                nim: '', nama: '', ekspedisi: '', paket: '',
                tanggalKirim: `${yyyy}-${mm}-${dd}`
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
            const nimClean = this.formDO.nim.trim();
            const namaClean = this.formDO.nama.trim();
        
            if (!nimClean || !namaClean || !this.formDO.ekspedisi || !this.formDO.paket) {
                if (typeof window.showToast === 'function') {
                    window.showToast('Semua field wajib diisi dan tidak boleh hanya berisi spasi!', 'error');
                }
                return;
            }
        
            const doNum = this.generatedDo;
            const det = this.selectedPaketDetail;
            const now = new Date();
            const YYYY = now.getFullYear();
            const MM = String(now.getMonth() + 1).padStart(2, '0');
            const DD = String(now.getDate()).padStart(2, '0');
            const hh = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');
            const ss = String(now.getSeconds()).padStart(2, '0');
            const timeStr = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
        
            const newEntry = {
                nim: nimClean,
                nama: namaClean,
                status: "Diproses",
                ekspedisi: this.formDO.ekspedisi,
                tanggalKirim: this.formDO.tanggalKirim,
                paket: this.formDO.paket,
                total: det ? det.harga : 0,
                perjalanan: [{ waktu: timeStr, keterangan: "Pesanan masuk dan DO diproses." }]
            };
        
            this.$emit('created', newEntry, doNum);
            this.formDO.nim = '';
            this.formDO.nama = '';
            this.formDO.ekspedisi = '';
            this.formDO.paket = '';
        }
    }
});