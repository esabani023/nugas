Vue.component('do-tracking', {
    template: '#tpl-tracking',
    props: ['trackingData', 'listPengiriman', 'listPaket'],
    data() {
        return {
            searchString: '',
            resultInfo: null,
            activeDO: '',
            progressBarWidth: '0%',
            isFormBuka: false,
            newProgressNote: ''
        };
    },
    methods: {
        formatTanggal(tgl) {
            if (!tgl) return '-';
            return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        },
        cariDO() {
            const key = this.searchString.trim()
            if (!key) {
                this.resultInfo = null;
                if (typeof window.showToast === 'function') {
                    window.showToast('Masukkan Nomor DO atau NIM terlebih dahulu!', 'warning');
                }
                return;
            }
        
            let foundKey = null;
            let foundVal = null;

            if (this.trackingData[key]) {
                foundKey = key;
                foundVal = this.trackingData[key];
            } else {
                for (let k in this.trackingData) {
                    if (this.trackingData[k].nim === key) {
                        foundKey = k;
                        foundVal = this.trackingData[k];
                        break;
                    }
                }
            }
        
            if (foundVal) {
                this.activeDO = foundKey;
                this.resultInfo = foundVal;
                this.progressBarWidth = '50%';
            } else {
                this.resultInfo = null;
                if (typeof window.showToast === 'function') {
                    window.showToast('Nomor DO atau NIM tidak ditemukan.', 'error');
                }
            }
        },
        clearSearch() {
            this.searchString = ''; this.resultInfo = null; this.activeDO = '';
        },
        tambahProgress() {
            if (!this.newProgressNote.trim()) return;
            const now = new Date();
            const YYYY = now.getFullYear();
            const MM = String(now.getMonth() + 1).padStart(2, '0');
            const DD = String(now.getDate()).padStart(2, '0');
            const hh = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');
            const ss = String(now.getSeconds()).padStart(2, '0');
            const timeStr = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
            this.resultInfo.perjalanan.push({ waktu: timeStr, keterangan: this.newProgressNote });
            this.newProgressNote = '';
        },
        handleCreatedDO(newEntry, doNum) {
            this.$emit('created-do', newEntry, doNum);
            this.isFormBuka = false;
        }
    }
});