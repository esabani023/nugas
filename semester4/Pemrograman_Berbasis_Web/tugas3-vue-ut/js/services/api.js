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
    },
    muatTemplates: async function(templates) {
        // Menggunakan Promise.all agar semua template diunduh secara paralel
        const promises = templates.map(async (tpl) => {
            try {
                const response = await fetch(tpl.path);
                if (!response.ok) throw new Error(`Gagal memuat ${tpl.path}`);
                
                const htmlString = await response.text();
                
                // Membuat elemen <template> secara virtual
                const templateElement = document.createElement('template');
                templateElement.id = tpl.id;
                templateElement.innerHTML = htmlString;
                
                // Menyuntikkan template ke bagian paling bawah <body>
                document.body.appendChild(templateElement);
                
            } catch (error) {
                console.error(`Error loading template ${tpl.id}:`, error);
            }
        });

        await Promise.all(promises);
    }
};
