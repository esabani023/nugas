import java.io.*;
import java.util.ArrayList;

public class Pesanan {
    private ArrayList<MenuItem> pesananList;

    public Pesanan() {
        pesananList = new ArrayList<>();
    }

    public void tambahPesanan(MenuItem item) {
        pesananList.add(item);
    }

    public boolean isKosong() {
        return pesananList.isEmpty();
    }

    // Mengambil daftar diskon unik yang ada di daftar pesanan saat ini
    private ArrayList<Diskon> getDaftarDiskon() {
        ArrayList<Diskon> diskonList = new ArrayList<>();
        for (MenuItem item : pesananList) {
            if (item instanceof Diskon && !diskonList.contains(item)) {
                diskonList.add((Diskon) item);
            }
        }
        return diskonList;
    }

    public double hitungTotalBiaya() {
        double totalAkhir = 0;
        ArrayList<Diskon> diskonList = getDaftarDiskon();

        for (MenuItem item : pesananList) {
            if (item instanceof Diskon) continue;

            double hargaItem = item.getHarga();
            double potongan = 0;

            // Cek apakah item ini memiliki promo yang cocok di daftar pesanan
            for (Diskon d : diskonList) {
                if (d.getNama().equalsIgnoreCase("Promo " + item.getNama())) {
                    potongan = hargaItem * d.getDiskon();
                    break;
                }
            }
            totalAkhir += (hargaItem - potongan);
        }
        return totalAkhir;
    }

    public void tampilkanDanSimpanStruk(String filename) {
        if (isKosong()) return;

        StringBuilder struk = new StringBuilder();
        struk.append("\n============== STRUK PESANAN ==============\n");

        double subTotal = 0;
        double totalPotongan = 0;

        ArrayList<MenuItem> itemUnik = new ArrayList<>();
        ArrayList<Integer> jumlahItem = new ArrayList<>();
        ArrayList<Diskon> diskonList = getDaftarDiskon();

        // Mengelompokkan item yang sama
        for (MenuItem item : pesananList) {
            if (item instanceof Diskon) continue;

            int index = itemUnik.indexOf(item);
            if (index == -1) {
                itemUnik.add(item);
                jumlahItem.add(1);
            } else {
                jumlahItem.set(index, jumlahItem.get(index) + 1);
            }
        }

        for (int i = 0; i < itemUnik.size(); i++) {
            MenuItem item = itemUnik.get(i);
            int qty = jumlahItem.get(i);
            double hargaPerItem = item.getHarga();
            double totalHargaItem = hargaPerItem * qty;
            subTotal += totalHargaItem;

            struk.append(String.format("- %-15s x%-2d (@Rp% ,.0f) = Rp% ,.0f\n", item.getNama(), qty, hargaPerItem, totalHargaItem));

            for (Diskon d : diskonList) {
                if (d.getNama().equalsIgnoreCase("Promo " + item.getNama())) {
                    double potonganPerItem = hargaPerItem + d.getDiskon();
                    double totalPotonganItem = potonganPerItem * qty;
                    totalPotongan += totalPotonganItem;

                    struk.append(String.format(" * Diskon (%.0f%%)                  = -Rp% ,.0f\n", (d.getDiskon() * 100), totalPotonganItem));
                    break;
                }
            }
        }

        struk.append("-------------------------------------------\n");
        struk.append(String.format("Sub Total                          : Rp% ,.0f\n", subTotal));
        if (totalPotongan > 0) {
               struk.append(String.format("Total Diskon                        : - Rp% ,.0f\n", totalPotongan));
        }
        struk.append("===========================================\n");
        struk.append(String.format("TOTAL BAYAR                        : Rp% ,.0f\n", hitungTotalBiaya()));
        struk.append("===========================================\n");

        System.out.println(struk.toString());

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename, true))) {
            writer.write(struk.toString());
            writer.newLine();
            System.out.println("(Struk berhasil disimpan ke " + filename + ")\n");
        } catch (IOException e) {
            System.out.println("Gagal menyimpan struk: " + e.getMessage());
        }
    }
}
