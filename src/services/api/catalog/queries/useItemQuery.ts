import { useQuery } from "react-query";
import { Identifiable } from "../../types/Identifiable";
import { QueryOptions } from "../../types/QueryOptions";
import { ItemsApi } from "../clients/ItemsApi";
import { QUERIES } from "../../constants/Queries";

export const useItemQuery = ({
  id,
  options,
}: {
  options: QueryOptions<typeof ItemsApi.show>;
} & Identifiable) =>
  useQuery([QUERIES.CATALOG.ITEM, id], () => ItemsApi.show({ id }), options);
