// Simpan di folder: api/proxy.js
export default async function handler(req, res) {
    // Ganti URL ini dengan URL Google Script Deployment ID Anda yang asli
    // Atau lebih baik gunakan process.env.GOOGLE_SCRIPT_URL dari settingan Vercel
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    // Setup CORS agar frontend bisa akses
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        if (req.method === 'POST') {
            // Terima data dari frontend (URLSearchParams) dan teruskan ke Google
            const formData = new URLSearchParams(req.body).toString();
            
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            });
            
            const data = await response.json();
            return res.status(200).json(data);

        } else if (req.method === 'GET') {
            // Handle request GET (untuk load nama interns)
            const { action } = req.query;
            const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=${action}`);
            const text = await response.text();
            
            // Bersihkan jika Google return JSONP (callback(...)) menjadi JSON murni
            const jsonStr = text.replace(/^.*?\(|\)$/g, ''); 
            
            try {
                const json = JSON.parse(jsonStr);
                return res.status(200).json(json);
            } catch (e) {
                return res.status(200).send(text);
            }
        }
    } catch (error) {
        return res.status(500).json({ error: 'Proxy Error', details: error.message });
    }
}