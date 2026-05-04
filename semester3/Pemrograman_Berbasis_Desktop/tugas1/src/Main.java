import java.util.Scanner;
import java.util.Locale;

public class Main {
    // Array berukuran 8 untuk menu
    static Menu[] daftarMenu = new Menu[8];

    public static void main(String[] args) {
        inisialisasiMenu();
        tampilkanMenu();
        prosesPesanan();
    }

    // Formating
    static String formatRupiah(double nominal) {
        return String.format(Locale.forLanguageTag("id-ID"), "%,d", (long)nominal);
    }

    // Mengisi data array
    static void inisialisasiMenu() {
        daftarMenu[0] = new Menu("Nasi Padang", 25000, "Makanan");
        daftarMenu[1] = new Menu("Nasi Goreng", 20000, "Makanan");
        daftarMenu[2] = new Menu("Ayam Bakar", 22000, "Makanan");
        daftarMenu[3] = new Menu("Sate Kambing", 30000, "Makanan");
        daftarMenu[4] = new Menu("Es Teh", 5000, "Minuman");
        daftarMenu[5] = new Menu("Es jeruk", 8000, "Minuman");
        daftarMenu[6] = new Menu("Wedang Jahe", 10000, "Minuman");
        daftarMenu[7] = new Menu("Air mineral", 4000, "Minuman");
    }

    // Menampilkan menu
    static void tampilkanMenu() {
        System.out.println("==================================");
        System.out.println("          MENU RESTORAN           ");
        System.out.println("==================================");
        System.out.println("--- KATEGORI: MAKANAN ---");
        System.out.println("1. " + daftarMenu[0].nama + " \t- Rp " + formatRupiah(daftarMenu[0].harga) + ",-");
        System.out.println("2. " + daftarMenu[1].nama + " \t- Rp " + formatRupiah(daftarMenu[1].harga) + ",-");
        System.out.println("3. " + daftarMenu[2].nama + " \t- Rp " + formatRupiah(daftarMenu[2].harga) + ",-");
        System.out.println("4. " + daftarMenu[3].nama + " - Rp " + formatRupiah(daftarMenu[3].harga) + ",-");

        System.out.println("\n--- KATEGORI: MINUMAN ---");
        System.out.println("5. " + daftarMenu[4].nama + " \t- Rp " + formatRupiah(daftarMenu[4].harga) + ",-");
        System.out.println("6. " + daftarMenu[5].nama + " \t- Rp " + formatRupiah(daftarMenu[5].harga) + ",-");
        System.out.println("7. " + daftarMenu[6].nama + " \t- Rp " + formatRupiah(daftarMenu[6].harga) + ",-");
        System.out.println("8. " + daftarMenu[7].nama + " \t- Rp " + formatRupiah(daftarMenu[7].harga) + ",-");
        System.out.println("==================================");
    }

    // Menerima input pesanan
    static void prosesPesanan() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Masukkan pesanan Anda (Maksimal 4 menu).");
        System.out.println("Contoh format: Nasi Padang = 2");
        System.out.println("Tekan Enter untuk melewati jika pesanan sudah cukup.");
        System.out.println("----------------------------------");

        String p1 = "", p2 = "", p3 = "", p4 = "";
        int q1 = 0, q2 = 0, q3 = 0, q4 = 0; 

        // Membaca Pesanan 1
        System.out.print("Pesanan 1:");
        String in1 = scanner.nextLine();
        if (in1.contains(" = ")) {
            String[] parts = in1.split(" = ");
            p1 = parts[0];
            q1 = Integer.parseInt(parts[1]);
        }

        // Membaca Pesanan 2
        System.out.print("Pesanan 2:");
        String in2 = scanner.nextLine();
        if (in2.contains(" = ")) {
            String[] parts = in2.split(" = ");
            p2 = parts[0];
            q2 = Integer.parseInt(parts[1]);
        }

        // Membaca Pesanan 3
        System.out.print("Pesanan 3:");
        String in3 = scanner.nextLine();
        if (in3.contains(" = ")) {
            String[] parts = in3.split(" = ");
            p3 = parts[0];
            q3 = Integer.parseInt(parts[1]);
        }

        // Membaca Pesanan 4
        System.out.print("Pesanan 4:");
        String in4 = scanner.nextLine();
        if (in4.contains(" = ")) {
            String[] parts = in4.split(" = ");
            p4 = parts[0];
            q4 = Integer.parseInt(parts[1]);
        }

        hitungDanCetakStruk(p1, q1, p2, q2, p3, q3, p4, q4);
        scanner.close();
    }

    // Fugsi mencari menu
    static Menu cariMenu(String nama) {
        if (nama.equals("")) return null;
        if (nama.equals(daftarMenu[0].nama)) return daftarMenu[0];
        if (nama.equals(daftarMenu[1].nama)) return daftarMenu[1];
        if (nama.equals(daftarMenu[2].nama)) return daftarMenu[2];
        if (nama.equals(daftarMenu[3].nama)) return daftarMenu[3];
        if (nama.equals(daftarMenu[4].nama)) return daftarMenu[4];
        if (nama.equals(daftarMenu[5].nama)) return daftarMenu[5];
        if (nama.equals(daftarMenu[6].nama)) return daftarMenu[6];
        if (nama.equals(daftarMenu[7].nama)) return daftarMenu[7];
        return null;
    }

    // Melakukan perhitungan struk
    static void hitungDanCetakStruk(String p1, int q1, String p2, int q2, String p3, int q3, String p4, int q4) {
        Menu m1 = cariMenu(p1);
        Menu m2 = cariMenu(p2);
        Menu m3 = cariMenu(p3);
        Menu m4 = cariMenu(p4);

        double total1 = 0, total2 = 0, total3 = 0, total4 = 0;

        if (m1 != null) total1 = m1.harga * q1;
        if (m2 != null) total2 = m2.harga * q2;
        if (m3 != null) total3 = m3.harga * q3;
        if (m4 != null) total4 = m4.harga * q4;

        double subTotal = total1 + total2 + total3 + total4;

        // Hitung diskon 10%
        double diskon = 0;
        if (subTotal > 100000) {
            diskon = subTotal * 0.10;
        }

        double totalSetelahDiskon = subTotal - diskon;
        double pajak = totalSetelahDiskon * 0.10;
        double biayaPelayanan = 20000;
        double totalAkhir = totalSetelahDiskon + pajak + biayaPelayanan;

        // Promo beli 1 gratis 1
        String infoPromo = "";
        double estimasiTotal = 0;

        if (subTotal > 50000) {
            Menu minumanPromo = daftarMenu[4];
            infoPromo = "Penawaran Beli 1 Gratis 1 " + minumanPromo.nama;

            double hargaMinumanPromo = minumanPromo.harga;
            double pajakDenganMinumanPromo = (hargaMinumanPromo + totalSetelahDiskon) * 0.10;
            estimasiTotal = totalSetelahDiskon + hargaMinumanPromo + pajakDenganMinumanPromo + biayaPelayanan; 
        }

        // Cetak struk
        System.out.println("==================================");
        System.out.println("          STRUK PESANAN           ");
        System.out.println("==================================");

        if (m1 != null) System.out.println("- " + m1.nama + " x" + q1 + " (@Rp" + formatRupiah(m1.harga) + ",-" + ") = Rp " + formatRupiah(total1) + ",-");
        if (m2 != null) System.out.println("- " + m2.nama + " x" + q2 + " (@Rp" + formatRupiah(m2.harga) + ",-" + ") = Rp " + formatRupiah(total2) + ",-");
        if (m3 != null) System.out.println("- " + m3.nama + " x" + q3 + " (@Rp" + formatRupiah(m3.harga) + ",-" + ") = Rp " + formatRupiah(total3) + ",-");
        if (m4 != null) System.out.println("- " + m4.nama + " x" + q4 + " (@Rp" + formatRupiah(m4.harga) + ",-" + ") = Rp " + formatRupiah(total4) + ",-");

        System.out.println("----------------------------------");
        System.out.println("Total Biaya Item    : Rp " + formatRupiah(subTotal) + ",-");
        
        if (diskon > 0) {
            System.out.println("Diskon (10%)        : -Rp " + formatRupiah(diskon) + ",-");
            System.out.println("Harga Setelah Diskon: Rp " + formatRupiah(totalSetelahDiskon) + ",-");
        }

        System.out.println("Pajak(10%)           : Rp " + formatRupiah(pajak) + ",-");
        System.out.println("Biaya Layanan        : Rp " + formatRupiah(biayaPelayanan));
        System.out.println("----------------------------------");
        System.out.println("TOTAL BAYAR          : Rp " + formatRupiah(totalAkhir) + ",-");
        System.out.println("==================================");

        // Cetak penawaran
        if (!infoPromo.equals("")) {
            System.out.println("\n*** PENAWARAN SPESIAL UNTUK ANDA ***");
            System.out.println(infoPromo + " (Harga: Rp " + formatRupiah(daftarMenu[4].harga) + ")");
            System.out.println("Jika diambil, Anda akan hanya membayar sebesar: Rp " + formatRupiah(estimasiTotal) + ",-");
            System.out.println("************************************");
        }
    }
}