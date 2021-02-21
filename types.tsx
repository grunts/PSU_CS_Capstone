export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Restaurants: undefined;
  Map: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  ServingTray: undefined;
  MenuScreen: { restaurant };
  StagingScreen: { MenuItem };
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type MenuItem = {
  name: string;
  image: string;
  longDesc: string;
  shortDesc: string;
  ABV: number;
  Allergens: number;
  price: number;
  category: string;
  mandatoryMods: Mod[];
  nonMandatoryMods: Mod[];
  customComments?: string;
  mods?: [string];
};

/**
 * modification name and options
 */
export type Mod = {
  /**
   * Name of the modifcation displayed above options
   */
  modName: string;
  /**
   * options that available to the modification
   */
  modOptions: modOption[]
};

/**
 * Each option contain the available option and a possible additional price
 */
export type modOption = {
  /**
   * Option text
   */
  option: string;
  /**
   * aditional price
   */
  adtlPrice: number;
};
