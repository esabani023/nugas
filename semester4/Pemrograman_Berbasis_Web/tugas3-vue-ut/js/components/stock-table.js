Vue.component('ba-stock-table', {
    template: '#tpl-stock',
    props: ['stok', 'listUpbjj', 'listKategori'],
    data() {
        return {
            filterSearch: '',
            activeSearchKeyword: '',
            typingTimer: null,
            filterUpbjj: '',
            filterKategori: '',
            filterSafety: false,
            sortColumn: 'judul',
            sortOrder: 'asc'
        };
    },
    
    computed: {
        filteredStok() {
            let result = this.stok;
            if (this.activeSearchKeyword) {
                const kw = this.activeSearchKeyword.toLowerCase();
                result = result.filter(i => i.judul.toLowerCase().includes(kw) || i.kode.toLowerCase().includes(kw));
            }
            if (this.filterUpbjj) {
                result = result.filter(i => i.upbjj === this.filterUpbjj);
            }
            if (this.filterUpbjj && this.filterKategori) {
                result = result.filter(i => i.kategori === this.filterKategori);
            }
            if (this.filterSafety) {
                result = result.filter(i => i.qty < i.safety || i.qty === 0);
            }
            return result.sort((a, b) => {
                let mod = this.sortOrder === 'asc' ? 1 : -1;
                if (this.sortColumn === 'judul') return a.judul.localeCompare(b.judul) * mod;
                if (this.sortColumn === 'qty') return (a.qty - b.qty) * mod;
                if (this.sortColumn === 'harga') return (a.harga - b.harga) * mod;
                return 0;
            });
        }
    },
    watch: {
        filterSearch(val) {
            clearTimeout(this.typingTimer);
            this.typingTimer = setTimeout(() => {
                this.activeSearchKeyword = val;
            }, 500);
        },
        filterUpbjj(val) {
            if (!val) this.filterKategori = '';
        }
    },
    methods: {
        setSort(col, ord) {
            this.sortColumn = col;
            this.sortOrder = ord;
        },
        resetFilter() {
            this.filterSearch = '';
            this.activeSearchKeyword = '';
            this.filterUpbjj = '';
            this.filterKategori = '';
            this.filterSafety = false;
            this.sortColumn = 'judul';
            this.sortOrder = 'asc';
        },
        bukaModal(mode, item = null, index = -1) {
            this.$emit('open-modal', mode, item, index);
        },
        konfirmasiHapus(kode) {
            this.$emit('confirm-delete', kode);
        }
    }
});