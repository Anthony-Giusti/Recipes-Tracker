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
    // formatted: (string | string[])[];
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
  ingredients: any;
  steps: any;
  additionalNotes: any;
}

export default IRecipe;
