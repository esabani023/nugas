public class Diskon extends MenuItem {
    private double diskon;

    public Diskon(String nama, String kategori, double diskon) {
        super(nama, 0, kategori); // Harga diskon dianggap 0
        this.diskon = diskon;
    }

    public double getDiskon() {
        return diskon;
    }

    @Override
    public void tampilMenu() {
        System.out.printf("%-20s - Potongan: %.0f%%\n", getNama(), (diskon * 100));
    }

    @Override
    public String formatFile() {
        return "Diskon;" + getNama() + ";0;" + getKategori() + ";" + diskon;
    }
}