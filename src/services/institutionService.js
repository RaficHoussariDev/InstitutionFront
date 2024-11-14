import api from "./api";

const API_BASE_URL = "http://localhost:8080/api/institution";

export async function getInstitutions() {
    const response = await api.get(API_BASE_URL);

    return response.data;
}

export async function upsertInstitution(institution) {
    await api.post(API_BASE_URL, { ...institution });
}