import { Id } from "../../../../aliases/Id";

export interface ImageModel {
  id: Id;
  src: string;
  fileName: string;
  position: number;
  alt: string;
}
