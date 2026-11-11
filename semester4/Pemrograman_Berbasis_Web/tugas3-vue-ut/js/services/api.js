const ApiService = {
    async fetchData() {
        try {
            const res = await fetch('data/dataBahanAjar.json');
            if (!res.ok) throw new Error('Gagal memuat data JSON');
            return await res.json();
        } catch (err) {
            console.error(err);
            return null;
        }
    }
};
