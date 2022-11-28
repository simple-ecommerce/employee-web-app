import { Identifiable } from "../../types/Identifiable";
import { SpecificationModel } from "./SpecificationModel";

export interface SpecificationCategoryModel extends Identifiable {
  name: string;
  description: string;
  internalName: string;
  specifications: SpecificationModel[];
}
