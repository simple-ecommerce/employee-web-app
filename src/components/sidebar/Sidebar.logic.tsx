import {
  AppstoreOutlined,
  DollarOutlined,
  InboxOutlined,
  LineChartOutlined,
  SettingOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Paths } from "../../constants/Paths";

export const ITEMS = [
  {
    label: "Dashboard",
    path: Paths.Dashboard.Index,
    icon: <LineChartOutlined />,
  },
  {
    label: "Catalog",
    path: "/catalog",
    icon: <AppstoreOutlined />,
    children: [
      {
        label: "Items",
        path: Paths.Catalog.Item.List,
      },
      {
        label: "Specifications",
        path: Paths.Catalog.Specification.List,
      },
    ],
  },
  { label: "Inventory", path: Paths.Inventory.Index, icon: <InboxOutlined /> },
  { label: "Orders", path: Paths.Orders.Index, icon: <TagOutlined /> },
  { label: "Balance", path: Paths.Balance.Index, icon: <DollarOutlined /> },
  { label: "Settings", path: Paths.Settings.Index, icon: <SettingOutlined /> },
];
