import { Id } from "../../../../aliases/Id";
import { Identifiable } from "../../types/Identifiable";

export interface SpecificationOptionModel extends Identifiable {
  name: string;
  description: string;
  specificationId: Id;
}
