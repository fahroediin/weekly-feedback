import { fetchInterns, submitFormData } from './api.js';
import { validateForm } from './validation.js';
import { setupRatingButtons, populateInternSelect, toggleLoading, resetFormUI, toggleGlobalLoader } from './ui.js';

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Setup UI
    document.getElementById('tanggal').valueAsDate = new Date();
    setupRatingButtons();

    // 2. Load Data dengan Global Loader
    try {
        const data = await fetchInterns();
        if (data && data.status === 'success') {
            populateInternSelect(data.interns);
        } else {
            populateInternSelect(null); // Trigger fallback
        }
    } catch (error) {
        console.error("Init Error:", error);
        populateInternSelect(null);
    } finally {
        // 3. Matikan Loader
        toggleGlobalLoader(false);
    }
});

// --- Event Listeners ---

// Submit Handler
document.getElementById('submitBtn').addEventListener('click', async () => {
    // Collect Data
    const formData = {
        action: 'submit',
        nama: document.getElementById('nama').value,
        mingguKe: document.getElementById('mingguKe').value,
        tanggal: document.getElementById('tanggal').value,
        kegiatanUtama: document.getElementById('kegiatanUtama').value,
        ratingPembelajaran: document.getElementById('valuePembelajaran').value,
        ratingMentor: document.getElementById('valueMentor').value,
        yangKurang: document.getElementById('yangKurang').value,
        saranPerbaikan: document.getElementById('saranPerbaikan').value
    };

    // Validate
    const validation = validateForm(formData);
    if (!validation.isValid) {
        Swal.fire({
            icon: 'warning',
            title: validation.title,
            text: validation.message,
            confirmButtonColor: '#3b82f6',
            confirmButtonText: 'Perbaiki'
        });
        if (validation.target) {
            document.getElementById(validation.target).focus();
        }
        return;
    }

    // Submit Process
    toggleLoading(true);
    try {
        const result = await submitFormData(formData);

        if (result.status === 'success' || result.result === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Laporan mingguan Anda telah tersimpan.',
                confirmButtonColor: '#3b82f6',
                timer: 3000,
                timerProgressBar: true
            });
            resetFormUI();
        } else {
            throw new Error(result.message || 'Gagal menyimpan data');
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kendala koneksi. Silakan coba lagi.',
            confirmButtonColor: '#ef4444'
        });
    } finally {
        toggleLoading(false);
    }
});

// Reset Handler
document.getElementById('resetBtn').addEventListener('click', () => {
    Swal.fire({
        title: 'Reset Form?',
        text: "Semua data yang sudah diisi akan hilang!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Reset',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            resetFormUI();
            Swal.fire({
                icon: 'success',
                title: 'Form Direset',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});