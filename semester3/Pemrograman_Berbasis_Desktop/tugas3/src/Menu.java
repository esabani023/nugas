import java.io.*;
import java.util.ArrayList;

public class Menu {
    private ArrayList<MenuItem> daftarMenu;

    public Menu() {
        daftarMenu = new ArrayList<>();
    }

    public void tambahItem(MenuItem item) {
        daftarMenu.add(item);
    }

    public void tampilkanSemuaMenu() {
        if (daftarMenu.isEmpty()) {
            System.out.println("Menu sedang kosong.");
            return;
        }

        System.out.println("\n=== MAKANAN ===");
        for (MenuItem item : daftarMenu) {
            if (item instanceof Makanan) item.tampilMenu();
        }

        System.out.println("\n=== MINUMAN ===");
        for (MenuItem item : daftarMenu) {
            if (item instanceof Minuman) item.tampilMenu();
        }

        System.out.println("\n=== DAFTAR DISKON ===");
        for (MenuItem item : daftarMenu) {
            if (item instanceof Diskon) item.tampilMenu();
        }
        System.out.println("==========================");
    }

    public MenuItem cariMenu(String nama) throws MenuNotFoundException {
        for (MenuItem item : daftarMenu) {
            if (item.getNama().equalsIgnoreCase(nama)) {
                return item;
            }
        }
        throw new MenuNotFoundException("Menu '" + nama + "' tidak ditemukan!");
    }

    // Hapus menu
    public void hapusMenu(String nama) throws MenuNotFoundException {
        MenuItem target = cariMenu(nama);
        daftarMenu.remove(target);
    }

    // Edit harga
    public void editHargaMenu(String nama, double hargaBaru) throws MenuNotFoundException {
        MenuItem target = cariMenu(nama);
        if (target instanceof Diskon) {
            System.out.println("Gagal: Diskon tidak memiliki harga rupiah. Silakan hapus dan buat ulang diskonnya.");
        } else {
            target.setHarga(hargaBaru);
        }
    }

    public void simpanKeFile(String filename) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            for (MenuItem item : daftarMenu) {
                writer.write(item.formatFile());
                writer.newLine();
            }
        } catch (IOException e) {
            System.out.println("Gagal menyimpan menu: " + e.getMessage());
        }
    }

    public void muatDariFile(String filename) {
        File file = new File(filename);
        if (!file.exists()) {
            tambahItem(new Makanan("Ayam Penyet", 20000, "Makanan", "Goreng"));
            tambahItem(new Makanan("Tahu Aci", 15000, "Makanan", "Cemilan"));
            tambahItem(new Makanan("Soto Lamongan", 20000, "Makanan", "Kuah"));
            tambahItem(new Makanan("Sego Megono", 15000, "Makanan", "Nasi"));
            tambahItem(new Minuman("Es Teh", 5000, "Minuman", "Teh"));
            tambahItem(new Minuman("Milkshake", 15000, "Minuman", "Susu"));
            tambahItem(new Minuman("Es Kopi Aren", 12000, "Minuman", "Kopi"));
            tambahItem(new Minuman("Teh Uwuh", 10000, "Minuman", "Teh"));
            return;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String baris;
            while ((baris = reader.readLine()) != null) {
                String[] parts = baris.split(";");
                String tipe = parts[0];
                String nama = parts[1];
                double harga = Double.parseDouble(parts[2]);
                String kategori = parts[3];

                if (tipe.equals("Makanan")) {
                    tambahItem(new Makanan(nama, harga, kategori, parts[4]));
                } else if (tipe.equals("Minuman")) {
                    tambahItem(new Minuman(nama, harga, kategori, parts[4]));
                } else if (tipe.equals("Diskon")) {
                    tambahItem(new Diskon(nama, kategori, Double.parseDouble(parts[4])));
                }    
            }
        } catch (IOException | NumberFormatException e) {
            System.out.println("Gagal memuat file menu: " + e.getMessage());
        }
    }
}