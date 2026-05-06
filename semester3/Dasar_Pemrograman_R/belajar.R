print("======================================")
print("NAMA: Esa Sya'bani")
print("NIM: 053060168")
print("======================================")
cat("\n")

# 1.
print("####### Program 1 #######")
M <- matrix(c(5:14), 2)
print("--- Matriks awal ---")
print(M)
cat("\n")

cross_product <- crossprod(M)
print("--- Hasil cross product ---")
print(cross_product)
cat("\n")

anak_matriks <- matrix(cross_product[c(1:10)], 5)
gabung <- cbind(cross_product, anak_matriks)
print("--- Hasil duplikat 2 kolom pertama ke kolom akhir ---")
print(gabung)
cat("\n")

# 2.
print("####### Program 2 #######")
B <- matrix(c(10, 3, 15, 7, 2, 20, 8, 12), 4)
print("--- Matriks awal ---")
print(B)
cat("\n")

perkalian <- B*5
print("--- Hasil perkalian matriks ---")
print(perkalian)
cat("\n")

print("--- Hasil filter ---")
filter <- perkalian[c(perkalian>15 & perkalian<60)] 
print(filter)



# M2 <- cbind(cross_product, c(M[elemen]))
# print(elemen)

# print(M[-c(2, 3)]) 

# # Membuat matriks M
# M <- matrix(c(5, 2, 3, 8, 7, 9, 3, 1, 5, 7, 4, 0, 4, 5, 2, 3),4)
# print("--- Matriks M ---")
# print(M)

# # a.
# M1 <- matrix(c(M[2,c(2,1)], M[1], M[4,2]),2)
# cat("\n")
# print("Hasil anak matriks M (M1)")
# print(M1)

# # b.
# M2 <- matrix(c(M[c(2, 3), 3], M[3, c(3, 1)]), 2)
# cat("\n")
# print("Hasil anak matriks M (M2)")
# print(M2)

# # Buat matriks a dan B
# a <- matrix(c(1, 4, 5, 6), 1)
# B <- matrix(c(1, 2, 4, 4, 1:4), 2, byrow=T)

# # c.
# M3 <- rbind(M, a)
# cat("\n")
# print("Hasil dari matriks M3")
# print(M3)

# # d.
# B_transpos <- t(B)
# M4 <- cbind(B_transpos, M)
# cat("\n")
# print("Hasil dari matriks M4")
# print(M4)

# # a.
# M_elemen <- M*M
# cat("\n")
# print("--- Hasil perkalian elemen ---")
# print(M_elemen)

# # b.
# M_aljabar <- M%*%M
# cat("\n")
# print("--- Hasil perkalian secara aljabar ---")
# print(M_aljabar)

# # c.
# M_invers <- solve(M)
# cat("\n")
# print("--- Hasil invers ---")
# print(M_invers)

# # d.
# M_transpos <- t(M)
# cat("\n")
# print("--- Hasil transpos ---")
# print(M_transpos)

# # e.
# M_hasil <- t(M)%*%M
# cat("\n")
# print("--- Hasil keseluruhan ---")
# print(M_hasil)





# a.
# data_waktu <- c(480, 30, 45, 60, 30, 45, 90, 60, 30, 120, 120, 30, 90, 45, 45, 30, 30, 30, 15, 15)
# print("=== Data waktu ===")
# print(data_waktu)

# # b.
# matriks_waktu <- matrix(data = data_waktu, nrow = 4, ncol = 5, byrow = TRUE)
# print("=== Matriks data waktu ===")
# print(matriks_waktu)

# # c.
# print("=== Nilai minimum, maksimum, rata-rata, median, dan modus ===")
# # m
# nilai_min <- min(data_waktu)
# print(paste("Nilai minimum:", nilai_min)) 
# nilai_max <- max(data_waktu)
# print(paste("Nilai maksimum:", nilai_max))
# nilai_mean <- mean(data_waktu)
# print(paste("Nilai rata-rata:", nilai_mean))
# nilai_median <- median(data_waktu)
# print(paste("Nilai median:", nilai_median))
# modus <- function(y) {
#     uy <- unique(y)
#     uy[which.max(tabulate(match(y,uy)))]
# }
# nilai_modus <- modus(data_waktu)
# print(paste("Nilai modus:", nilai_modus))


# Prodi <- rep(c("Matematika","Statistika","Biologi"),6)
# asal_daerah <- rep(c("Jakarta","Bogor","Bandung"),each=3,2)
# usia <- rep(c(22,26),each=9)
# data_frame <- data.frame(Prodi,asal_daerah,usia)
# print(data_frame)



# a.

# biaya <- 5000000; modal <- 10000000; karyawan <- 15; proyeksi <- 12000000; stok_barang <- 250
# list <- ls(pat="y")
# print("=== output a ===")
# print(list)

# # b.
# print("=== output b ===")
# for (i in 1:25) {print(i)}

# c.



# 1.
# angka <- seq(from=0, to=3, length=6)
# tipeData <- class(angka)
# statusNumerik <- is.character(tipeData)
# cekAtribut <- list(angka,tipeData,statusNumerik)
# print("=== Output Nomor 1 ===")
# print(cekAtribut)

# # 2.
# data1 <- seq(from=1, to=8, length=10)
# data2 <- rep(rep(2:6,each=3),3)
# data3 <- c(rep(2,3), rep(5,5), rep(8,7))
# dataFrame <- data.frame(
#   "Data 1"=c(mean(data1), median(data1), sum(data1)),
#   "Data 2"=c(mean(data2), median(data2), sum(data2)),
#   "Data 3"=c(mean(data3), median(data3), sum(data3))
# )
# row.names(dataFrame) <- c("Mean","Median","Jumlah")
# print("=== Output Nomor 2 ===")
# print(dataFrame)




# 1. Membuat data (diperpendek dengan argumen times & each)
# data1 <- seq(from=1, to=8, length=10)
# data2 <- rep(2:4, each=3, times=3) 
# data3 <- rep(c(2, 5, 8), times=c(3, 5, 7))

# # 2. Menghitung dan menggabungkan langsung ke dalam data frame
# dataFrame <- data.frame(
#   Data_1 = c(mean(data1), median(data1), sum(data1)),
#   Data_2 = c(mean(data2), median(data2), sum(data2)),
#   Data_3 = c(mean(data3), median(data3), sum(data3))
# )

# # 3. Opsional: Memberi nama baris agar tabel mudah dibaca
# row.names(dataFrame) <- c("Mean", "Median", "Sum")

# print(dataFrame)



# Jurusan <- c(rep("Statistika", 2), "Matematika", "Fisika")
# Kota <- c(rep("Jakarta", 2), "Bandung", "Surabaya")
# Angkatan <- 2021:2024
# dataMahasiswa <- data.frame(Jurusan,Kota,Angkatan)
# print(dataMahasiswa)





























# 1.
# a <- 5:10
# print("=== Value Variabel a ===")
# print(a)

# # 2.
# b <- seq(from=10, to=2, length=5)
# print("=== Value Variabel b ===")
# print(b)

# # 3.
# c <- seq(from=0, to=1, length=6)
# print("=== Value Variabel c ===")
# print(c)

# # 4.
# d <- c(rep(3, 3), rep(7, 3), rep(9, 2))
# print("=== Value Variabel d ===")
# print(d)

# # 5.
# e <- rep(c(1,2),4)
# print("=== Value Variabel e ===")
# print(e)