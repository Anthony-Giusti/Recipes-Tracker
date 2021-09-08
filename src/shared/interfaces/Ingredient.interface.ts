interface IIngredient {
  id: string;
  category: string;
  name: string;
  units: string[];
  comment: string | null;
  unit: string;
  quantity: number;
  customUnitAdded: boolean;
  customUnit: string;
}

export default IIngredient;
