public class Minuman extends MenuItem {
    private String jenisMinuman;

    public Minuman(String nama, double harga, String kategori, String jenisMinuman) {
        super(nama, harga, kategori);
        this.jenisMinuman = jenisMinuman;
    }

    public String getJenisMinuman() {
        return jenisMinuman;
    }

    @Override
    public void tampilMenu() {
        System.out.printf("%-20s - Rp% ,.0f (%s)\n", getNama(), getHarga(), jenisMinuman);
    }

    @Override
    public String formatFile() {
        return "Minuman;" + getNama() + ";" + getHarga() + ";" + getKategori() + ";" + jenisMinuman;
    }
}