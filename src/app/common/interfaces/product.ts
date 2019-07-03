import { Measure } from './measure';
import { Nutrition } from './nutrition';

export interface Product {
  code: number;
  description: string;
  foodGroup: string;
  measures: Measure[];
  nutrition: Nutrition;
}
