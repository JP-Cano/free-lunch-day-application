import axios from 'axios';
import { Config } from './app.config';

export const httpService = axios.create({
  baseURL: Config.MARKETPLACE_URL,
  timeout: Config.AXIOS_TIMEOUT,
});