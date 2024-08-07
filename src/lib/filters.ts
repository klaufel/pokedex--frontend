export const FILTERS_DICTIONARY = {
  TYPE: "TYPE",
  COLOR: "COLOR",
  GENDER: "GENDER",
} as const;

export const FILTERS = {
  [FILTERS_DICTIONARY.TYPE]: "type",
  [FILTERS_DICTIONARY.COLOR]: "color",
  [FILTERS_DICTIONARY.GENDER]: "gender",
} as const;

export const INITIAL_FILTERS = {
  [FILTERS.TYPE]: [],
  [FILTERS.COLOR]: [],
  [FILTERS.GENDER]: [],
};
