import { Id } from "../../../../aliases/Id";
import { Identifiable } from "../../types/Identifiable";

export interface EspecificationOptionModel extends Identifiable {
  name: string;
  description: string;
  especificationId: Id;
}
