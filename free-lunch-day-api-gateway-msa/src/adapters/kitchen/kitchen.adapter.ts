import { Config } from '../../config/app.config';
import { httpService } from '../../config/http.config';
import { Catch } from '../../utils/decorators/catch.decorator';

export class KitchenAdapter {

  @Catch()
  async getAllRecipes() {
    const { data } = await httpService.get(`${Config.KITCHEN_MSA_URL}/recipes`);
    return data;
  }

  @Catch()
  async getOrderHistory() {
    const { data } = await httpService.get(`${Config.KITCHEN_MSA_URL}/order/history`);
    return data;
  }

  @Catch()
  async getAllPendingOrders() {
    const { data } = await httpService.get(`${Config.KITCHEN_MSA_URL}/order`);
    return data;
  }

  @Catch()
  async createOrder() {
    const { data } = await httpService.post(`${Config.KITCHEN_MSA_URL}/order`, {});
    return data;
  }
}

