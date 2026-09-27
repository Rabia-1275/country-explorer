export interface Country {
  names: {
    common: string;
    official: string;
  };
  codes: {
    alpha_2: string;
    alpha_3: string;
  };
  capitals: { name: string }[];
  flag: {
    url_png: string;
    url_svg: string;
    emoji: string;
  };
  region: string;
  subregion: string;
  population: number;
  area: {
    kilometers: number;
  };
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages: {
    name: string;
    native_name: string;
  }[];
  borders: string[];
  cars: {
    driving_side: string;
  };
  calling_codes: string[];
  timezones: string[];
}
