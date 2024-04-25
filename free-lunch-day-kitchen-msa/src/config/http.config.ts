import axios from 'axios';
import { Config } from './app.config';

export const httpService = axios.create({
  baseURL: Config.FOOD_WAREHOUSE_URL,
  timeout: Config.AXIOS_TIMEOUT,
});