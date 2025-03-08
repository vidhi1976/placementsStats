import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api/jobs/";

export const fetchJobs = async (page = 1, limit = 50) => {
    try {
        const startId = (page - 1) * limit + 1;
        const endId = Math.min(startId + limit - 1, 424); // Ensures we don't exceed 424 jobs
        const jobIds = Array.from({ length: endId - startId + 1 }, (_, i) => startId + i);
        const jobData = await Promise.all(
            jobIds.map(async (id) => {
                try {
                    const response = await axios.get(`${API_BASE_URL}${id}`);
                    return response.data;
                } catch (error) {
                    console.error(`Error fetching job ID ${id}:`, error);
                    return null;
                }
            })
        );

        return jobData.filter(Boolean);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
};
