import { Layout } from "antd";
import "antd/dist/reset.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import * as Pages from "./pages";
import { AuthStore } from "./services/stores/auth/AuthStore";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import { Sidebar } from "./components";
import { Paths } from "./constants/Paths";

function App() {
  const isAuthenticated = AuthStore.use.isAuthenticated();
  const isLoading = AuthStore.use.isLoading();

  useEffect(() => {
    const cookies = parseCookies();
    const isAuthenticated = !!cookies["ecommerce.refresh_token"];

    AuthStore.set.isAuthenticated(isAuthenticated);
    AuthStore.set.isLoading(false);
  }, []);

  if (isLoading) return null;

  if (!isAuthenticated)
    return (
      <Layout>
        <Layout.Content>
          <Routes>
            <Route path={Paths.Auth.Login} element={<Pages.Auth.Login />} />
            <Route path="/" element={<Pages.Auth.Login />} />
          </Routes>
        </Layout.Content>
      </Layout>
    );

  return (
    <Layout>
      <Layout.Sider>
        <Sidebar />
      </Layout.Sider>
      <Layout.Content>
        <Routes>
          {/* DASHBOARD */}
          <Route
            path={Paths.Dashboard.Index}
            element={<Pages.Dashboard.Index />}
          />
          {/* CATALOG */}
          <Route
            path={Paths.Catalog.Item.Create}
            element={<Pages.Catalog.CreateItem />}
          />
          <Route
            path={Paths.Catalog.Item.Edit}
            element={<Pages.Catalog.EditItem />}
          />
          <Route
            path={Paths.Catalog.Item.View}
            element={<Pages.Catalog.ViewItem />}
          />
          <Route
            path={Paths.Catalog.Item.List}
            element={<Pages.Catalog.ListItems />}
          />
          <Route
            path={Paths.Catalog.Specification.Create}
            element={<Pages.Catalog.CreateSpecification />}
          />
          <Route
            path={Paths.Catalog.Specification.Edit}
            element={<Pages.Catalog.EditSpecification />}
          />
          <Route
            path={Paths.Catalog.Specification.View}
            element={<Pages.Catalog.ViewSpecification />}
          />
          <Route
            path={Paths.Catalog.Specification.List}
            element={<Pages.Catalog.ListSpecifications />}
          />

          {/* INVENTORY */}
          <Route
            path={Paths.Inventory.Index}
            element={<Pages.Inventory.Index />}
          />

          {/* ORDERS */}
          <Route path={Paths.Orders.Index} element={<Pages.Orders.Index />} />

          {/* BALANCE */}
          <Route path={Paths.Balance.Index} element={<Pages.Balance.Index />} />
          <Route
            path={Paths.Settings.Index}
            element={<Pages.Settings.Index />}
          />

          {/* SETTINGS */}
          <Route
            path={Paths.Settings.Index}
            element={<Pages.Settings.Index />}
          />

          {/*  */}
          <Route path="/" element={<Pages.Catalog.Index />} />
        </Routes>
      </Layout.Content>
    </Layout>
  );
}

export default App;
