export function setupRatingButtons() {
    document.querySelectorAll('.rating-group').forEach(group => {
        const targetId = group.getAttribute('data-target');
        const hiddenInput = document.getElementById(targetId);
        const buttons = group.querySelectorAll('.rating-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                
                // Reset styles
                buttons.forEach(b => {
                    const val = b.getAttribute('data-value');
                    if (val <= 3) {
                        b.className = 'rating-btn flex-1 py-2 px-4 rounded-lg font-semibold transition bg-red-100 text-red-700 hover:bg-red-200';
                    } else {
                        b.className = 'rating-btn flex-1 py-2 px-4 rounded-lg font-semibold transition bg-green-100 text-green-700 hover:bg-green-200';
                    }
                });

                // Highlight selected
                if (value <= 3) {
                    this.className = 'rating-btn flex-1 py-2 px-4 rounded-lg font-semibold transition bg-red-500 text-white';
                } else {
                    this.className = 'rating-btn flex-1 py-2 px-4 rounded-lg font-semibold transition bg-green-500 text-white';
                }

                hiddenInput.value = value;
            });
        });
    });
}

export function populateInternSelect(interns) {
    const select = document.getElementById('nama');
    select.innerHTML = '<option value="">Pilih nama...</option>';
    
    if (interns && interns.length > 0) {
        interns.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
    } else {
        // Fallback
        select.innerHTML = '<option value="">Pilih nama...</option><option value="Qorina">Qorina</option><option value="Azizah">Azizah</option>';
    }
}

export function toggleLoading(isLoading) {
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const btnIcon = document.getElementById('btnIcon');

    if (isLoading) {
        submitBtn.disabled = true;
        submitText.textContent = 'Mengirim...';
        submitBtn.dataset.originalIcon = btnIcon.innerHTML; // Simpan icon lama
        btnIcon.innerHTML = '<div class="spinner"></div>';
    } else {
        submitBtn.disabled = false;
        submitText.textContent = 'Submit';
        if (submitBtn.dataset.originalIcon) {
            btnIcon.innerHTML = submitBtn.dataset.originalIcon;
        }
    }
}

export function resetFormUI() {
    document.getElementById('weeklyForm').reset();
    document.getElementById('tanggal').valueAsDate = new Date();
    
    // Reset Rating Buttons Visuals
    document.querySelectorAll('.rating-btn').forEach(btn => {
        const val = btn.getAttribute('data-value');
        if (val <= 3) {
            btn.className = 'rating-btn flex-1 py-2 px-4 rounded-lg font-semibold transition bg-red-100 text-red-700 hover:bg-red-200';
        } else if (val == 7) {
            btn.className = 'rating-btn flex-1 py-2 px-4 rounded-lg font-semibold transition bg-green-500 text-white';
        } else {
            btn.className = 'rating-btn flex-1 py-2 px-4 rounded-lg font-semibold transition bg-green-100 text-green-700 hover:bg-green-200';
        }
    });

    // Reset Hidden Inputs
    document.getElementById('valuePembelajaran').value = 7;
    document.getElementById('valueMentor').value = 7;
}