import INewRecipe from '../interfaces/NewRecipe.interface';
import IRecipe from '../interfaces/Recipe.interface';

type SubmitNewRecipe = (recipe: INewRecipe) => void;
type SubmitEditedRecipe = (recipe: IRecipe) => void;
type SubmitRecipe = SubmitNewRecipe & SubmitEditedRecipe;

export { SubmitEditedRecipe, SubmitNewRecipe, SubmitRecipe };
