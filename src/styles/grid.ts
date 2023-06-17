const spacings = {
  space4: 4,
  space6: 6,
  space8: 8,
  space12: 12,
  space16: 16,
  space20: 20,
  space24: 24,
  space32: 32,
  space36: 36,
  space40: 40,
  space48: 48,
  space64: 64,
  space80: 80,
  space96: 96,
  space112: 112,
  space124: 124,
  space148: 148,
} as const;

type ValueOf<T> = T[keyof T];

export type Spacings = ValueOf<typeof spacings>;

export const grid = {
  /**
   * The spacings are available to use, but prefer using the semantic name.
   */
  spacings,
  // TODO: create your own custom semantics
  sideSpacing: spacings.space24,
};
