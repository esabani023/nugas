import java.util.Scanner;
import java.util.Locale;

public class Main {
    // Array untuk menampung hingga 100 menu restoran
    static Menu[] daftarMenu = new Menu[100];
    static int jumlahMenu = 0; // Melacak jumlah menu yang aktif
    
    // Scanner global
    static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        inisialisasiMenu();
        
        boolean isRunning = true;
        while (isRunning) {
            System.out.println("\n==================================");
            System.out.println("    SISTEM MANAJEMEN RESTORAN     ");
            System.out.println("==================================");
            System.out.println("1. Masuk sebagai Pelanggan (Pesan)");
            System.out.println("2. Masuk sebagai Pemilik Restoran");
            System.out.println("3. Keluar Aplikasi");
            System.out.print("Pilih Menu Utama (1/2/3): ");
            
            String pilihan = scanner.nextLine();

            if (pilihan.equals("1")) {
                menuPelanggan();
            } else if (pilihan.equals("2")) {
                menuPemilik();
            } else if (pilihan.equals("3")) {
                isRunning = false;
                System.out.println("Terima kasih telah menggunakan sistem ini!");
            } else {
                System.out.println("Pilihan tidak valid! Silakan masukkan angka 1, 2, atau 3.");
            }
        }
    }

    // BAGIAN PELANGGAN (PEMESANAN)
    static void menuPelanggan() {
        // Array untuk menampung pesanan pelanggan (Kapasitas maks 100 item)
        Menu[] pesananMenu = new Menu[100];
        int[] pesananJumlah = new int[100];
        int jumlahPesanan = 0;

        System.out.println("\n--- SELAMAT DATANG PELANGGAN ---");
        tampilkanMenu();

        System.out.println("Format pemesanan: Nama Menu = Jumlah (Contoh: Nasi Padang = 2)");
        System.out.println("Ketik 'selesai' jika pesanan sudah cukup.");
        System.out.println("----------------------------------");

        // Infinity loop sampai pelanggan mengetik 'selesai'
        while (true) {
            System.out.print("Input Pesanan Anda: ");
            String input = scanner.nextLine();

            if (input.equalsIgnoreCase("selesai")) {
                break; // Keluar dari loop pemesanan
            }

            if (input.contains(" = ")) {
                String[] parts = input.split(" = ");
                String namaMenuInput = parts[0];
                int qty = 0;

                try {
                    qty = Integer.parseInt(parts[1]);
                } catch (Exception e) {
                    System.out.println("Format jumlah salah! Harus berupa angka. Silakan coba lagi.");
                    continue; // Mengulang permintaan input
                }

                Menu menuDitemukan = cariMenu(namaMenuInput);
                
                if (menuDitemukan == null) {
                    System.out.println("Maaf, menu '" + namaMenuInput + "' tidak ada di daftar! Silakan ketik dengan benar.");
                } else {
                    // Masukkan ke array pesanan
                    pesananMenu[jumlahPesanan] = menuDitemukan;
                    pesananJumlah[jumlahPesanan] = qty;
                    jumlahPesanan++;
                    System.out.println(">> " + menuDitemukan.nama + " berhasil ditambahkan.");
                }
            } else {
                System.out.println("Format salah! Gunakan format spasi ( = ). Contoh: Es Teh = 3");
            }
        }

        // Lanjut ke perhitungan struk jika ada pesanan
        if (jumlahPesanan > 0) {
            hitungDanCetakStruk(pesananMenu, pesananJumlah, jumlahPesanan);
        } else {
            System.out.println("Anda tidak memesan apa-apa.");
        }
    }

    // BAGIAN PEMILIK RESTORAN (MANAJEMEN MENU)
    static void menuPemilik() {
        boolean isOwnerMenu = true;
        while (isOwnerMenu) {
            System.out.println("\n--- PANEL PEMILIK RESTORAN ---");
            System.out.println("1. Tambah Menu Baru");
            System.out.println("2. Ubah Harga Menu");
            System.out.println("3. Hapus Menu");
            System.out.println("4. Lihat Daftar Menu");
            System.out.println("5. Kembali ke Menu Utama");
            System.out.print("Pilih opsi (1-5): ");
            String pilihan = scanner.nextLine();

            if (pilihan.equals("1")) {
                tambahMenuBaru();
            } else if (pilihan.equals("2")) {
                ubahHargaMenu();
            } else if (pilihan.equals("3")) {
                hapusMenu();
            } else if (pilihan.equals("4")) {
                tampilkanMenu();
            } else if (pilihan.equals("5")) {
                isOwnerMenu = false; // Kembali ke parent menu
            } else {
                System.out.println("Opsi tidak valid, coba lagi!");
            }
        }
    }

    static void tambahMenuBaru() {
        System.out.println("\n-- TAMBAH MENU BARU --");
        // Menambah beberapa menu sekaligus
        while (true) {
            System.out.print("Masukkan Nama Menu: ");
            String nama = scanner.nextLine();
            
            System.out.print("Masukkan Harga (contoh: 15000): ");
            double harga = 0;
            try {
                harga = Double.parseDouble(scanner.nextLine());
            } catch (Exception e) {
                System.out.println("Harga tidak valid! Harus berupa angka. Silakan coba lagi.");
                continue; // Meminta input kembali
            }

            System.out.print("Masukkan Kategori (Makanan/Minuman): ");
            String kategori = scanner.nextLine();

            daftarMenu[jumlahMenu] = new Menu(nama, harga, kategori);
            jumlahMenu++;
            System.out.println("Menu berhasil ditambahkan!");

            System.out.print("Ingin menambah menu lain sekaligus? (Ya/Tidak): ");
            String lanjut = scanner.nextLine();
            if (!lanjut.equalsIgnoreCase("Ya")) {
                break;
            }
        }
    }

    static void ubahHargaMenu() {
        System.out.println("\n-- UBAH HARGA MENU --");
        tampilkanMenuBiasa();
        
        while (true) {
            System.out.print("Masukkan Nomor Menu yang ingin diubah (atau '0' untuk batal): ");
            int nomor = -1;
            try {
                nomor = Integer.parseInt(scanner.nextLine());
            } catch (Exception e) {
                System.out.println("Harus berupa angka!");
                continue;
            }

            if (nomor == 0) break;

            if (nomor > 0 && nomor <= jumlahMenu) {
                int indeks = nomor - 1;
                System.out.print("Masukkan harga baru untuk " + daftarMenu[indeks].nama + " (contoh format: 15000)" + ": ");
                double hargaBaru = Double.parseDouble(scanner.nextLine());

                System.out.print("Apakah Anda yakin mengubah harga menjadi Rp " + formatRupiah(hargaBaru) + "? (Ya/Tidak): ");
                String konfirmasi = scanner.nextLine();

                if (konfirmasi.equalsIgnoreCase("Ya")) {
                    daftarMenu[indeks].harga = hargaBaru;
                    System.out.println("Harga berhasil diubah!");
                } else {
                    System.out.println("Perubahan dibatalkan.");
                }
                break; // Selesai proses ubah, kembali ke menu pemilik restoran
            } else {
                System.out.println("Nomor menu tidak valid/tidak ditemukan! Silakan input ulang.");
            }
        }
    }

    static void hapusMenu() {
        System.out.println("\n-- HAPUS MENU --");
        tampilkanMenuBiasa();
        
        while (true) {
            System.out.print("Masukkan Nomor Menu yang ingin dihapus (atau '0' untuk batal): ");
            int nomor = -1;
            try {
                nomor = Integer.parseInt(scanner.nextLine());
            } catch (Exception e) {
                System.out.println("Harus berupa angka!");
                continue;
            }

            if (nomor == 0) break;

            if (nomor > 0 && nomor <= jumlahMenu) {
                int indeks = nomor - 1;
                System.out.print("Apakah Anda yakin ingin MENGHAPUS " + daftarMenu[indeks].nama + "? (Ya/Tidak): ");
                String konfirmasi = scanner.nextLine();

                if (konfirmasi.equalsIgnoreCase("Ya")) {
                    // Proses penghapusan array dengan menggeser elemen di sebelah kanannya ke kiri
                    for (int i = indeks; i < jumlahMenu - 1; i++) {
                        daftarMenu[i] = daftarMenu[i + 1];
                    }
                    daftarMenu[jumlahMenu - 1] = null; // Kosongkan elemen terakhir
                    jumlahMenu--;
                    System.out.println("Menu berhasil dihapus!");
                } else {
                    System.out.println("Penghapusan dibatalkan.");
                }
                break; // Selesai proses hapus
            } else {
                System.out.println("Nomor menu tidak valid/tidak ditemukan! Silakan input ulang.");
            }
        }
    }

    // FUNGSI-FUNGSI PENDUKUNG (HELPER)
    static String formatRupiah(double nominal) {
        return String.format(Locale.forLanguageTag("id-ID"), "%,d", (long)nominal);
    }

    static void inisialisasiMenu() {
        daftarMenu[0] = new Menu("Nasi Padang", 25000, "Makanan");
        daftarMenu[1] = new Menu("Nasi Goreng", 20000, "Makanan");
        daftarMenu[2] = new Menu("Ayam Bakar", 22000, "Makanan");
        daftarMenu[3] = new Menu("Sate Kambing", 30000, "Makanan");
        daftarMenu[4] = new Menu("Es Teh", 5000, "Minuman");
        daftarMenu[5] = new Menu("Es Jeruk", 8000, "Minuman");
        daftarMenu[6] = new Menu("Wedang Jahe", 10000, "Minuman");
        daftarMenu[7] = new Menu("Air Mineral", 4000, "Minuman");
        jumlahMenu = 8;
    }

    // Tampilan menu
    static void tampilkanMenu() {
        System.out.println("==================================");
        System.out.println("          MENU RESTORAN           ");
        System.out.println("==================================");
        
        System.out.println("--- KATEGORI: MAKANAN ---");
        for (int i = 0; i < jumlahMenu; i++) {
            if (daftarMenu[i].kategori.equalsIgnoreCase("Makanan")) {
                System.out.println("- " + daftarMenu[i].nama + " \t- Rp " + formatRupiah(daftarMenu[i].harga) + ",-");
            }
        }
        
        System.out.println("\n--- KATEGORI: MINUMAN ---");
        for (int i = 0; i < jumlahMenu; i++) {
            if (daftarMenu[i].kategori.equalsIgnoreCase("Minuman")) {
                System.out.println("- " + daftarMenu[i].nama + " \t- Rp " + formatRupiah(daftarMenu[i].harga) + ",-");
            }
        }
        System.out.println("==================================");
    }

    // Tampilan numerik berurutan untuk fitur Ubah/Hapus (pemilik restoran)
    static void tampilkanMenuBiasa() {
        for (int i = 0; i < jumlahMenu; i++) {
            System.out.println((i + 1) + ". " + daftarMenu[i].nama + " - Rp " + formatRupiah(daftarMenu[i].harga));
        }
    }

    // Pencarian menu
    static Menu cariMenu(String nama) {
        for (int i = 0; i < jumlahMenu; i++) {
            if (daftarMenu[i].nama.equalsIgnoreCase(nama)) {
                return daftarMenu[i];
            }
        }
        return null;
    }

    // Menghitung dan mencetak struk
    static void hitungDanCetakStruk(Menu[] pesananMenu, int[] pesananJumlah, int totalItemPesanan) {
        double subTotal = 0;

        System.out.println("\n==================================");
        System.out.println("          STRUK PESANAN           ");
        System.out.println("==================================");
        
        // Cetak pesanan
        for (int i = 0; i < totalItemPesanan; i++) {
            double totalPerItem = pesananMenu[i].harga * pesananJumlah[i];
            subTotal += totalPerItem;
            System.out.println("- " + pesananMenu[i].nama + " x" + pesananJumlah[i] + 
                               " (@Rp" + formatRupiah(pesananMenu[i].harga) + ",-) = Rp " + formatRupiah(totalPerItem) + ",-");
        }
        
        System.out.println("----------------------------------");
        System.out.println("Total Biaya Item    : Rp " + formatRupiah(subTotal) + ",-");

        // Hitung diskon 10%
        double diskon = 0;
        if (subTotal > 100000) {
            diskon = subTotal * 0.10;
            System.out.println("Diskon (10%)        : -Rp " + formatRupiah(diskon) + ",-");
        }

        double totalSetelahDiskon = subTotal - diskon;
        double pajak = totalSetelahDiskon * 0.10;
        double biayaPelayanan = 20000;
        double totalAkhir = totalSetelahDiskon + pajak + biayaPelayanan;

        // Promo beli 1 gratis 1
        String infoPromo = "";
        double estimasiTotal = 0;

        if (subTotal > 50000) {
            // Mencari item "Minuman" pertama yang tersedia di daftar menu sebagai promo
            Menu minumanPromo = null;
            for (int i = 0; i < jumlahMenu; i++) {
                if (daftarMenu[i].kategori.equalsIgnoreCase("Minuman")) {
                    minumanPromo = daftarMenu[i];
                    break;
                }
            }

            if (minumanPromo != null) {
                infoPromo = "Penawaran Beli 1 Gratis 1 " + minumanPromo.nama;
                double hargaMinumanPromo = minumanPromo.harga;
                double pajakDenganMinumanPromo = (hargaMinumanPromo + totalSetelahDiskon) * 0.10;
                estimasiTotal = totalSetelahDiskon + hargaMinumanPromo + pajakDenganMinumanPromo + biayaPelayanan; 
            }
        }

        System.out.println("Harga Setelah Diskon: Rp " + formatRupiah(totalSetelahDiskon) + ",-");
        System.out.println("Pajak(10%)          : Rp " + formatRupiah(pajak) + ",-");
        System.out.println("Biaya Layanan       : Rp " + formatRupiah(biayaPelayanan) + ",-");
        System.out.println("----------------------------------");
        System.out.println("TOTAL BAYAR         : Rp " + formatRupiah(totalAkhir) + ",-");
        System.out.println("==================================");

        // Cetak penawaran
        if (!infoPromo.equals("")) {
            System.out.println("\n*** PENAWARAN SPESIAL UNTUK ANDA ***");
            System.out.println(infoPromo + " (Harga: Rp " + formatRupiah(cariMenu(infoPromo.replace("Penawaran Beli 1 Gratis 1 ", "")).harga) + ",-)");
            System.out.println("Jika diambil, Anda akan hanya membayar sebesar: Rp " + formatRupiah(estimasiTotal) + ",-");
            System.out.println("************************************");
        }
    }
}