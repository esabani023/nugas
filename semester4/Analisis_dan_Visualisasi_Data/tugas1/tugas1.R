# Soal 1a
library(readxl)
data <- read_excel("Tabel_Tugas1.xlsx")
rata_kecepatan <- mean(data$`Kecepatan (km/h)`)
print(paste("Rata-rata kecepatan mobil:", rata_kecepatan, "km/h"))

# Soal 1b
rata_jarak <- mean(data$`Jarak (meter)`)
print(paste("Rata-rata jarak yang ditempuh mobil:", rata_jarak, "m"))

# Soal 1c
standar_deviasi <- round(sd(data$`Jarak (meter)`), digits = 3)
print(paste("Standar deviasi data jarak yang ditempuh mobil:", standar_deviasi, "m"))

# Soal 2a
plot(data$`Kecepatan (km/h)`, data$`Jarak (meter)`,
     main = "Scatter Plot Kecepatan vs Jarak",
     xlab = "Kecepatan (km/h)",
     ylab = "Jarak (meter)",
     pch = 19)

# Soal 2c
hist(data$`Kecepatan (km/h)`,
     main = "Histogram dari Data Kecepatan Mobil",
     xlab = "Kecepatan (km/h)",
     ylab = "Frekuensi",
     breaks = seq(0, 30, by = 2))

# Soal 3
rumus_kk <- function(sd, avg) {
  (sd/avg) * 100
}

kk_matematika <- round(rumus_kk(10, 75), digits = 3)
print(paste("Koefisien keragaman untuk nilai ujian matematika Thomas:", kk_matematika, "%"))

kk_inggris <- round(rumus_kk(8, 70), digits = 3)
print(paste("Koefisien keragaman untuk nilai ujian bahasa Inggris Thomas:", kk_inggris, "%"))