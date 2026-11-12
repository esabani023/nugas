Vue.component('status-badge', function(resolve, reject) {
    fetch('templates/status-badge.html')
    .then(response => {
        if (!response.ok) throw new Error("Gagal memuat template");
        return response.text(); 
    })
    .then(htmlTemplate => {
        // Me-resolve komponen Vue setelah HTML berhasil diunduh
        resolve({
            template: htmlTemplate,
            props: {
                qty: { type: Number, required: true },
                safety: { type: Number, required: true },
                catatan: { type: String, default: '' }
            },
            data() {
                return { showTooltip: false };
            }
        });
    })
    .catch(err => {
        console.error("Error loading component:", err);
        reject(err);
    });
});