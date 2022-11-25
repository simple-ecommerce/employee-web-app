import { Identifiable } from "../../types/Identifiable";
import { EspecificationOptionModel } from "./EspecificationOptionModel";

export interface EspecificationModel extends Identifiable {
  name: string;
  desciption: string;
  internalName: string;
  options: EspecificationOptionModel[];
}
