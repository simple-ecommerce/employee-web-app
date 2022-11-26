export const Paths = {
  Dashboard: {
    Index: "/",
  },
  Catalog: {
    Item: {
      List: "/catalog/items",
      Create: "/catalog/item/create",
      Edit: "/catalog/item/:id/edit",
      View: "/catalog/item/:id",
    },
    Specification: {
      List: "/catalog/specifications",
      View: "/catalog/specification/:id",
      Create: "/catalog/specification/create",
      Edit: "/catalog/specification/:id/edit",
    },
  },
  Inventory: {
    Index: "/inventory",
  },
  Orders: {
    Index: "/orders",
  },
  Balance: {
    Index: "/balance",
  },
  Settings: {
    Index: "/settings",
  },
  Auth: {
    Login: "/login",
  },
};
