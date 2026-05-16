import java.util.Scanner;
import java.util.Locale;

public class App {

    static Scanner scanner = new Scanner(System.in);

    static String formatRupiah(double nominal) {
        return String.format(Locale.forLanguageTag("id-ID"), "%,d", (long)nominal);
    }

    public static void main(String[] args) {
        double gajiGolA = 5000000;
        double gajiGolB = 6500000;
        double gajiGolC = 9500000;
        double persenLembur1 = 0.30;
        double persenLembur2 = 0.32;
        double persenLembur3 = 0.34;
        double persenLembur4 = 0.36;
        double persenLembur5 = 0.38;

        double gajiGolongan = 0;
        double persenGajiLembur = 0;

        System.out.print("Masukkan golongan anda (A/B/C): ");
        String golongan = scanner.nextLine();

        if (golongan.equalsIgnoreCase("A")) {
            gajiGolongan = gajiGolA;
        } else if (golongan.equalsIgnoreCase("B")) {
            gajiGolongan = gajiGolB;
        } else if (golongan.equalsIgnoreCase("C")) {
            gajiGolongan = gajiGolC;
        } else {
            System.out.println("Golongan yang anda masukkan tidak valid!");
            return;
        }

        System.out.print("Masukkan lama waktu lembur anda dalam jam: ");
        double lamaLembur = Double.parseDouble(scanner.nextLine());

        if (lamaLembur == 1) {
            persenGajiLembur = persenLembur1;
        } else if (lamaLembur == 2) {
            persenGajiLembur = persenLembur2;
        } else if (lamaLembur == 3) {
            persenGajiLembur = persenLembur3;
        } else if (lamaLembur == 4) {
            persenGajiLembur = persenLembur4;
        } else if (lamaLembur >= 5) {
            persenGajiLembur = persenLembur5;
        } else if (lamaLembur == 0) {
            persenGajiLembur = 0;
        } else {
            System.out.println("Masukan tidak valid! Pastikan tidak ada typo penulisan");
            return;
        }

        double gajiLembur = gajiGolongan * persenGajiLembur;

        double jumlahPenghasilan = gajiGolongan + gajiLembur;
        System.out.println("Total penghasilan anda adalah: Rp " + formatRupiah(jumlahPenghasilan) + ",-");
    }
}