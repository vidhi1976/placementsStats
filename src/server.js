const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_BASE_URL = "https://iamalone.adminisalone.workers.dev/isadminalone/";

app.get("/api/jobs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${API_BASE_URL}${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch job data" });
    }
});

app.listen(5000, () => console.log("Proxy server running on port 5000"));
