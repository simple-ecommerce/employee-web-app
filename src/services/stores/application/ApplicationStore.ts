import { createStore } from "@udecode/zustood";
import { Languages } from "../../../constants/Languages";

export const ApplicationStore = createStore("ApplicationStore")<{
  companyId: number | null;
  language: Languages;
}>({
  companyId: null,
  language: Languages.ENGLISH,
});
