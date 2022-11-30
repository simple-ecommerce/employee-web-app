import { createStore } from "@udecode/zustood";

export const ApplicationStore = createStore("ApplicationStore")<{
  companyId: number | null;
}>({
  companyId: 1,
});
