import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

export async function login(username, password) {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });

    const { token } = response.data;
    return token;
}

export async function register(username, password) {
    await axios.post(`${API_BASE_URL}/register`, { username, password });
}