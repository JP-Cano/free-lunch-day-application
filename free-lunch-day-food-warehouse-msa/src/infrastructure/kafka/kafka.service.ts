import { Consumer, Kafka, Producer } from 'kafkajs';
import { kafkaConfig } from '../../config/kafka.config';
import { SERVICE_NAME } from '../utils/constants/constants';
import { logger } from '../utils/logger/logger';

export class KafkaService {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly consumer: Consumer;
  private static singleton: KafkaService;

  constructor() {
    this.kafka = new Kafka(kafkaConfig);
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: SERVICE_NAME });
  }

  instance(): KafkaService {
    if (!KafkaService.singleton) {
      KafkaService.singleton = new KafkaService();
      return KafkaService.singleton;
    }
    return KafkaService.singleton;
  }

  async produce(topic: string, value: string): Promise<void> {
    try {
      logger.info(`Init publishing to topic ${topic} with value ${value}`);
      await this.producer.connect();
      await this.producer.send({
        topic,
        messages: [
          {
            value,
            key: SERVICE_NAME,
          },
        ],
      });
      logger.info(`Finished publishing to topic ${topic}`);
    } catch (err: any) {
      logger.error(`Error publishing message to topic: ${topic}`, JSON.stringify(err));
      throw new Error(err.message);
    }
  }

  async consume(topic: string, callback: Function) {
    try {
      logger.info(`Init subscribing to topic ${topic}`);
      await this.consumer.connect();
      await this.consumer.subscribe({ topic, fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value?.toString();
          logger.info(`Consumer info -->  topic: ${topic} - partition: ${partition}`);
          callback(value);
        },
      });
    } catch (err: any) {
      logger.error(`Error consuming message to topic: ${topic}`, JSON.stringify(err));
      throw new Error(err.message);
    }
  }
}