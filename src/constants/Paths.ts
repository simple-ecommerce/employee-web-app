export const Paths = {
  Dashboard: {
    Index: "/",
  },
  Catalog: {
    Item: {
      List: "/catalog/items",
      Create: "/catalog/items/create",
      Edit: "/catalog/items/:id/edit",
      View: "/catalog/items/:id",
    },
    Specification: {
      List: "/catalog/specifications",
      View: "/catalog/specifications/:id",
      Create: "/catalog/specifications/create",
      Edit: "/catalog/specifications/:id/edit",
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
