export function validateForm(data) {
    // 1. Validasi Kelengkapan Text (Required)
    const requiredFields = ['nama', 'mingguKe', 'tanggal', 'kegiatanUtama', 'yangKurang', 'saranPerbaikan'];
    for (const field of requiredFields) {
        if (!data[field]) {
            return { 
                isValid: false, 
                title: 'Data Belum Lengkap',
                message: 'Mohon lengkapi semua field yang bertanda bintang (*)',
                target: null
            };
        }
    }

    // 2. Validasi Rating (Wajib Diisi)
    if (!data.ratingPembelajaran) {
        return {
            isValid: false,
            title: 'Rating Kosong',
            message: 'Mohon berikan nilai untuk Proses Pembelajaran.',
            target: null
        };
    }

    if (!data.ratingMentor) {
        return {
            isValid: false,
            title: 'Rating Kosong',
            message: 'Mohon berikan nilai untuk Komunikasi & Bimbingan Mentor.',
            target: null
        };
    }

    // 3. Validasi Minggu Ke- (Min 1)
    if (parseInt(data.mingguKe) < 1) {
        return {
            isValid: false,
            title: 'Input Tidak Valid',
            message: 'Minggu Ke- harus diisi dengan angka 1 atau lebih.',
            target: 'mingguKe'
        };
    }

    // 4. Validasi Panjang Karakter
    if (data.kegiatanUtama.trim().length < 30) {
        return {
            isValid: false,
            title: 'Deskripsi Terlalu Singkat',
            message: `Mohon jelaskan kegiatan lebih detail (min 30 karakter). Saat ini: ${data.kegiatanUtama.trim().length}.`,
            target: 'kegiatanUtama'
        };
    }

    if (data.yangKurang.trim().length < 10) {
        return {
            isValid: false,
            title: 'Feedback Terlalu Singkat',
            message: 'Mohon jelaskan kekurangan dengan lebih jelas (min 10 karakter).',
            target: 'yangKurang'
        };
    }

    if (data.saranPerbaikan.trim().length < 10) {
        return {
            isValid: false,
            title: 'Saran Terlalu Singkat',
            message: 'Mohon berikan saran perbaikan yang jelas (min 10 karakter).',
            target: 'saranPerbaikan'
        };
    }

    return { isValid: true };
}