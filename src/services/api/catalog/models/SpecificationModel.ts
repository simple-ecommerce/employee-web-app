import { Id } from "../../../../aliases/Id";
import { Identifiable } from "../../types/Identifiable";

export interface SpecificationModel extends Identifiable {
  name: string;
  description: string;
  specificationId: Id;
}
