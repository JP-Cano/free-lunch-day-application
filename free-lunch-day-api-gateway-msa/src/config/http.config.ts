import axios from 'axios';
import { Config } from './app.config';

export const httpService = axios.create({
  timeout: Config.AXIOS_TIMEOUT,
});

