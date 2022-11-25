import { Identifiable } from "../../types/Identifiable";
import { SpecificationOptionModel } from "./SpecificationOptionModel";

export interface SpecificationModel extends Identifiable {
  name: string;
  desciption: string;
  internalName: string;
  options: SpecificationOptionModel[];
}
