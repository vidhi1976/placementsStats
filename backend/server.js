import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { id } = req.query;
    const API_BASE_URL = "https://iamalone.adminisalone.workers.dev/isadminalone/";

    try {
        const response = await axios.get(`${API_BASE_URL}${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch job data" });
    }
}
