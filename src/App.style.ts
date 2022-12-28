import styled from "styled-components";
import { Layout as AntdLayout } from "antd";

export const Layout = {
  Sider: styled(AntdLayout.Sider)`
    position: fixed !important;
    background-color: white !important;
    overflow: auto;
    height: 100vh;
    left: 0px;
    top: 0px;
    bottom: 0px;
  `,
  Content: styled(AntdLayout.Content)`
    margin-left: 200px;
  `,
};
