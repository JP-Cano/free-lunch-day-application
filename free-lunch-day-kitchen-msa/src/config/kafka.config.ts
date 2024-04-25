import { KafkaConfig } from 'kafkajs';
import { Config } from './app.config';

const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = Config;
const sasl = username && password ? { username, password, mechanism: 'plain' } : null;
const ssl = !!sasl;

export const kafkaConfig: KafkaConfig = {
  enforceRequestTimeout: false,
  brokers: [Config.KAFKA_BOOTSTRAP_SERVER],
  connectionTimeout: Config.CONNECTION_TIMEOUT,
  retry: {
    initialRetryTime: 100,
    retries: 100,
  },
  ssl,
  sasl: {
    username,
    password,
    mechanism: 'plain',
  },
};