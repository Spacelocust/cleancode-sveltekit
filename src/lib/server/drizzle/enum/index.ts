export const categories = {
  first: 'FIRST',
  second: 'SECOND',
  third: 'THIRD',
  fourth: 'FOURTH',
  fifth: 'FIFTH',
  sixth: 'SIXTH',
  seventh: 'SEVENTH',
  done: 'DONE',
} as const;

export const categoryFrequency = {
  [categories.first]: 1,
  [categories.second]: 2,
  [categories.third]: 4,
  [categories.fourth]: 8,
  [categories.fifth]: 16,
  [categories.sixth]: 32,
  [categories.seventh]: 64,
  [categories.done]: null,
} as const;

export const getPreviousCategory = (category: (typeof categories)[keyof typeof categories]) => {
  const [keys, values] = [Object.keys(categories) as (keyof typeof categories)[], Object.values(categories)];
  const index = values.indexOf(category);

  return categories[keys[index - 1]] ?? categories.first;
};

export const getNextCategory = (category: (typeof categories)[keyof typeof categories]) => {
  const [keys, values] = [Object.keys(categories) as (keyof typeof categories)[], Object.values(categories)];
  const index = values.indexOf(category);

  return categories[keys[index + 1]] ?? categories.done;
};
