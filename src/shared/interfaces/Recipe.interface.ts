import IStep from './Step.interface';
import IIngredient from './Ingredient.interface';

interface IRecipe {
  title: string;
  details: string;
  servings: string;
  cookTime: {
    hours: number;
    minutes: number;
    formatted: string | null;
  };
  sourceURL: string;
  imageURLs: string[];
  categories: {
    raw: string[];
    formatted: string[];
  };
  dietTags: {
    raw: string[];
    formatted: string[];
  };
  id: string;
  intolerances: {
    raw: string[];
    formatted: string[];
  };
  ingredients: IIngredient[];
  steps: IStep[];
  additionalNotes: IStep[];
}

export default IRecipe;
