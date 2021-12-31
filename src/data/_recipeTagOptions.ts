import IRecipeTagsOption from '../shared/interfaces/RecipeTagsOption.interface';

const categoryOptions: IRecipeTagsOption[] = [
  { label: 'Main Course', value: 'main course' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'Appertizer', value: 'appetizer' },
  { label: 'Salad', value: 'salad' },
  { label: 'Bread', value: 'bread' },
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Soup', value: 'soup' },
  { label: 'Beverage', value: 'beverage' },
  { label: 'Sauce', value: 'sauce' },
  { label: 'Marinade', value: 'marinade' },
  { label: 'Fingerfood', value: 'fingerfood' },
  { label: 'Snack', value: 'snack' },
  { label: 'Drink', value: 'drink' },
];

const dietTagOptions: IRecipeTagsOption[] = [
  { label: 'Gluten Free', value: 'gluten free' },
  { label: 'Ketogenic', value: 'ketogenic' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Lacto-Vegetarian', value: 'lacto-vegetarian' },
  { label: 'Ovo-Vegetarian', value: 'ovo-vegetarian' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Lactose Free', value: 'lactose free' },
  { label: 'Paleo', value: 'paleo' },
  { label: 'Primal', value: 'primal' },
  { label: 'Whole30', value: 'whole30' },
];

const intoleranceOptions: IRecipeTagsOption[] = [
  { label: 'Dairy', value: 'dairy' },
  { label: 'Egg', value: 'egg' },
  { label: 'Gluten', value: 'gluten' },
  { label: 'Grain', value: 'grain' },
  { label: 'Peanut', value: 'peanut' },
  { label: 'Seafood', value: 'seafood' },
  { label: 'Sesame', value: 'sesame' },
  { label: 'Shellfish', value: 'shellfish' },
  { label: 'Soy', value: 'soy' },
  { label: 'Sulfite', value: 'sulfite' },
  { label: 'Tree Nut', value: 'tree nut' },
  { label: 'Wheat', value: 'wheat' },
];

export { categoryOptions, dietTagOptions, intoleranceOptions };
