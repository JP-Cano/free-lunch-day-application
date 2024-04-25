export interface IngredientsDto {
  id: number;
  name: string;
  quantity: number;
}

export interface AllIngredientsDto extends Omit<IngredientsDto, 'quantity'> {
  availableQuantity: number;
}