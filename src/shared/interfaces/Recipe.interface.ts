import IStep from './Step.interface';
import IIngredient from './Ingredient.interface';
import IRecipeTags from './RecipeTags.interface';

interface IRecipe {
  id: string;
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
  categories: IRecipeTags;
  dietTags: IRecipeTags;
  intolerances: IRecipeTags;
  ingredients: IIngredient[];
  steps: IStep[];
  additionalNotes: IStep[];
}

export default IRecipe;
