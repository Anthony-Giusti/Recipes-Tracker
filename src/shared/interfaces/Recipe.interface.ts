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
    formatted: (string | string[])[];
  };
  dietTags: {
    raw: string[];
    formatted: (string | string[])[];
  };
  id: string | null;
  intolerances: {
    raw: string[];
    formatted: (string | string[])[];
  };
  ingredients: any;
  steps: any;
  additionalNotes: any;
}

export default IRecipe;
