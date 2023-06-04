// https://api.themoviedb.org/3/
// /movie/now_playing?api_key=5a569954ddc95a299a8cf6c1aa9cefa5&language=pt-BR

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;
