interface IIngredient {
  id: string;
  category: string;
  name: string;
  units: string[];
  aisle: string;
  comment: string | null;
  unit: string;
  possibleUnits: string[];
  quantity: number;
  customUnitAdded: boolean;
  customUnit: string;
}

export default IIngredient;
