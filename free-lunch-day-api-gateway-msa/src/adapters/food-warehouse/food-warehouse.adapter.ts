import { Config } from '../../config/app.config';
import { httpService } from '../../config/http.config';
import { Catch } from '../../utils/decorators/catch.decorator';

export class FoodWarehouseAdapter {

  @Catch()
  async getMarketPlacePurchaseHistory() {
    const { data } = await httpService.get(`${Config.FOOD_MARKETPLACE_URL}/buy/history`);
    return data;
  }

  @Catch()
  async getAllIngredients() {
    const { data } = await httpService.get(`${Config.FOOD_MARKETPLACE_URL}/ingredients`);
    return data;
  }
}
