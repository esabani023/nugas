Vue.component('status-badge', function(resolve, reject) {
    fetch('templates/status-badge.html')
        .then(res => res.text())
        .then(htmlTemplate => {
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
        .catch(err => reject(err));
});