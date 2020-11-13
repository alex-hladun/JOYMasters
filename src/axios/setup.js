import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.sportsdata.io/golf/v2/json/Leaderboard/375/',
  timeout: 1000,
  headers: {'key': '581cd4fce4574b3aac8b6587ca01c4d6'}
});

export default instance;