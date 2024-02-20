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
