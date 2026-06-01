import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Menu menuRestoran = new Menu();
        Pesanan pesananSekarang = new Pesanan();

        String menuFile = "data_menu.txt";
        String strukFile = "data_struk.txt";

        menuRestoran.muatDariFile(menuFile);

        boolean isRunning = true;
        while (isRunning) {
            System.out.println("\n=== SISTEM MANAJEMEN RESTORAN ===");
            System.out.println("1. Tambah Item Menu Baru");
            System.out.println("2. Tampilkan Daftar Menu");
            System.out.println("3. Edit Harga Menu");
            System.out.println("4. Hapus Menu");
            System.out.println("5. Pesan & Cetak Struk");
            System.out.println("6. Lihat Riwayat Penjualan (Muat Struk)");
            System.out.println("7. Keluar");
            System.out.print("Pilih menu (1-7): ");

            String pilihan = scanner.nextLine();

            switch (pilihan) {
                case "1": // Tambah menu
                    System.out.print("Tipe (1:Makanan, 2:Minumana, 3:Diskon): ");
                    String tipe = scanner.nextLine();

                    if (!tipe.equals("1") && !tipe.equals("2") && !tipe.equals("3")) {
                        System.out.println("Error: Tipe tidak valid! Masukan angka 1/2/3.");
                        break;
                    }

                    System.out.print("Nama Item (Ketik persis namanya untuk diskon): ");
                    String nama = scanner.nextLine();

                    if (tipe.equals("3")) {
                        try {
                            MenuItem targetMenu = menuRestoran.cariMenu(nama);
                            System.out.print("Besar Diskon (Contoh 0.15 untuk 15%): ");
                            double diskon = Double.parseDouble(scanner.nextLine());

                            menuRestoran.tambahItem(new Diskon("Promo " + targetMenu.getNama(), "Diskon", diskon));
                            menuRestoran.simpanKeFile(menuFile);
                            System.out.println("Diskon berhasil ditambahkan!");
                        } catch (MenuNotFoundException e) {
                            System.out.println("Error: " + e.getMessage());
                        } catch (NumberFormatException e) {
                            System.out.println("Error: Format diskon salah!");
                        }
                    } else {
                        try {
                            System.out.print("Harga: ");
                            double harga = Double.parseDouble(scanner.nextLine());
                            System.out.print("Jenis Khusus (misal: Kuah/Goreng/Kopi: )");
                            String jenis = scanner.nextLine();

                            if (tipe.equals("1")) {
                                menuRestoran.tambahItem(new Makanan(nama, harga, "Makanan", jenis));
                            } else {
                                menuRestoran.tambahItem(new Minuman(nama, harga, "Minuman", jenis));
                            }
                            menuRestoran.simpanKeFile(menuFile);
                            System.out.println("Item berhasil ditambahkan!");
                        } catch (NumberFormatException e) {
                            System.out.println("Error: Format harga salah! Harus berupa angka.");
                        }
                    }
                    break;
                case "2": // Tampilkan Menu
                    menuRestoran.tampilkanSemuaMenu();
                    break;

                case "3": // Edit Harga
                    System.out.print("Masukkan nama menu yang ingin diubah harganya: ");
                    String namaEdit = scanner.nextLine();
                    try {
                        System.out.print("Masukkan harga baru: ");
                        double hargaBaru = Double.parseDouble(scanner.nextLine());
                        menuRestoran.editHargaMenu(namaEdit, hargaBaru);
                        menuRestoran.simpanKeFile(menuFile); // Autosave menu
                        System.out.println("Harga menu berhasil diperbarui!");
                    } catch (MenuNotFoundException e) {
                        System.out.println("Error: " + e.getMessage());
                    } catch (NumberFormatException e) {
                        System.out.println("Error: Format harga salah!");
                    }
                    break;
                case "4": // Hapus menu
                    System.out.print("Masukkan nama menu yang ingin dihapus: ");
                    String namaHapus = scanner.nextLine();
                    try {
                        menuRestoran.hapusMenu(namaHapus);
                        menuRestoran.simpanKeFile(menuFile); // Autosave menu
                        System.out.println("Menu '" + namaHapus + "' berhasil dihapus!");
                    } catch (MenuNotFoundException e) {
                        System.out.println("Error: " + e.getMessage());
                    }
                    break;
                case "5": // Pesan dan cetak struk
                    menuRestoran.tampilkanSemuaMenu();
                    System.out.println("\nFormat Pemesanan: Nama Menu = Jumlah (Contoh: Ayam Penyet = 2)");
                    System.out.println("Ketik 'selesai' jika sudah selesai memesan.");

                    while (true) {
                        System.out.print("Input Pesanan: ");
                        String input = scanner.nextLine();

                        if (input.equalsIgnoreCase("selesai")) {
                            break;
                        }

                        if (!input.contains(" = ")) {
                            System.out.println("Error: Format salah! Gunakan spasi dan sama dengan ( = ). Coba lagi.");
                            continue;
                        }

                        String[] parts = input.split(" = ");
                        String namaPesan = parts[0];

                        try {
                            int qty = Integer.parseInt(parts[1]);
                            MenuItem itemDitemukan = menuRestoran.cariMenu(namaPesan);

                            // Tambahkan objek ke array list sebanyak qty
                            for (int i = 0; i < qty; i++) {
                                pesananSekarang.tambahPesanan(itemDitemukan);
                            }
                            System.out.println(">> " + qty + " " + itemDitemukan.getNama() + " berhasil ditambahkan.");
                            if (!(itemDitemukan instanceof Diskon)) {
                                try {
                                    // Mencari apakah menu ini sedang ada diskonnya
                                    MenuItem promoOtomatis = menuRestoran.cariMenu("Promo " + itemDitemukan.getNama());

                                    // Jika ketemu, masukkan voucher promo tersebut ke daftar pesanan
                                    pesananSekarang.tambahPesanan(promoOtomatis);
                                    System.out.println("Selamat! " + promoOtomatis.getNama() + " didapatkan.");
                                } catch (MenuNotFoundException e) {
                                    // Abaikan jika tidak ada promo
                                }
                            }
                        } catch (MenuNotFoundException e) {
                            System.out.println("Error: " + e.getMessage() + " Coba lagi.");
                        } catch (NumberFormatException e) {
                            System.out.println("Error: Format jumlah salah! Harus berupa angka. Coba lagi.");
                        }
                    }

                    // Setelah user mengetik 'selesai', langsung cetak struk
                    if (!pesananSekarang.isKosong()) {
                        pesananSekarang.tampilkanDanSimpanStruk(strukFile);
                        pesananSekarang = new Pesanan(); // Reset daftar pesanan untuk pelanggan berikutnya
                    } else {
                        System.out.println("Pemesanan dibatalkan (Daftar pesanan kosong).");
                    }
                    break;
                case "6": // Muat stuk dari file teks
                    System.out.println("\n=== RIWAYAT PENJUALAN ===");
                    try (java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.FileReader(strukFile))){
                        String barisStruk;
                        boolean adaData = false;
                        while ((barisStruk = reader.readLine()) != null) {
                            System.out.println(barisStruk);
                            adaData = true;
                        }
                        if (!adaData) {
                            System.out.println("Belum ada riwayat penjualan.");
                        }
                    } catch (java.io.IOException e) {
                        System.out.println("Gagal memuat struk: Belum ada file data_struk.txt yang tersimpan.");
                    }
                    break;
                case "7": // Keluar
                    isRunning = false;
                    System.out.println("Sistem dimatikan. Terima kasih!");
                    break;
                default:
                    System.out.println("Pilihan tidak valid!");
            }
        }
        scanner.close();
    }
}
