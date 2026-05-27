import java.util.Scanner;
import java.util.Locale;

public class App {
    static Scanner scanner = new Scanner(System.in);

    static String formatRupiah(double nominal) {
        return String.format(Locale.forLanguageTag("id-ID"), "%,d", (long)nominal);
    }

    public static void main(String[] args) {
        double[] gaji = {5000000, 6500000, 9500000};
        double[] persenLembur = {30, 32, 34, 36, 38};

        double gajiGolongan = 0;
        double persenGajiLembur = 0;

        System.out.print("Masukkan golongan anda (A/B/C): ");
        String golongan = scanner.nextLine();

        if (golongan.equalsIgnoreCase("A")) {
            gajiGolongan = gaji[0];
        } else if (golongan.equalsIgnoreCase("B")) {
            gajiGolongan = gaji[1];
        } else if (golongan.equalsIgnoreCase("C")) {
            gajiGolongan = gaji[2];
        } else {
            System.out.println("Golongan yang anda masukkan tidak valid!");
            return;
        }

        System.out.print("Masukkan lama waktu lembur anda dalam jam: ");
        double lamaLembur = Double.parseDouble(scanner.nextLine());

        if (lamaLembur == 1) {
            persenGajiLembur = persenLembur[0];
        } else if (lamaLembur == 2) {
            persenGajiLembur = persenLembur[1];
        } else if (lamaLembur == 3) {
            persenGajiLembur = persenLembur[2];
        } else if (lamaLembur == 4) {
            persenGajiLembur = persenLembur[3];
        } else if (lamaLembur >= 5) {
            persenGajiLembur = persenLembur[4];
        } else if (lamaLembur == 0) {
            persenGajiLembur = 0;
        } else {
            System.out.println("Masukan tidak valid! Pastikan tidak ada salah penulisan.");
            return;
        }

        double gajiLembur = gajiGolongan * persenGajiLembur / 100;

        double jumlahPenghasilan = gajiGolongan + gajiLembur;
        System.out.println("Total penghasilan anda adalah: Rp " + formatRupiah(jumlahPenghasilan) + ",-");
    }
}
