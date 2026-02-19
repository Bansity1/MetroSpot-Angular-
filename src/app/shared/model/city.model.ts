export interface Place {
  name: string;
  short: string;
  desc: string;
  address: string;
  hours: string;
  price: string;
  img: string;
  map: string;
  category: string;
}

export interface Category {
  key: string;
  label: string;
  icon: string;
}

export interface CityData {
  name: string;
  description: string;
  culture: string;
  foodScene: string;
  whyVisit: string;
  categories: Category[];
  places: Place[];
}
export interface CityShowcase {
  id: string;
  name: string;
  description: string;
  backgroundImage: string;
  isPopular: boolean;
}