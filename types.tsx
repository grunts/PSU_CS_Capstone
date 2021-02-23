export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Restaurants: undefined;
  Map: undefined;
  Order: undefined
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

export type TabThreeParamList = {
  TabThreeScreen: undefined
}

export type MenuItem = {
  name: string,
  image: string,
  longDesc: string,
  shortDesc: string,
  ABV: number,
  Allergens: number,
  price: number,
  category: string,
  mandatoryMods: [],
  nonMandatoryMods: [],
  customComments?: string
  mods?: [string]
};
