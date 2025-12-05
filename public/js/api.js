import { API_URL } from './config.js';

export async function fetchInterns() {
    try {
        const response = await fetch(`${API_URL}?action=getInterns`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('❌ Failed to load interns:', error);
        return null;
    }
}

export async function submitFormData(dataObject) {
    const params = new URLSearchParams();
    
    // Convert object to URLSearchParams
    for (const key in dataObject) {
        params.append(key, dataObject[key]);
    }
    params.append('timestamp', new Date().toLocaleString('id-ID'));

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
    });

    return await response.json();
}