import React from "react";
import { AppProps } from "next/app";
import { Refine, GitHubBanner } from "@pankod/refine-core";
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
  AuthPage,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine-antd/dist/reset.css";
import { AntdInferencer } from "@pankod/refine-inferencer/antd";
import { ColorModeContextProvider } from "@contexts";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "@components/layout";
import { authProvider } from "src/authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <GitHubBanner />
      <ColorModeContextProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "posts",
              list: AntdInferencer,
              edit: AntdInferencer,
              show: AntdInferencer,
              create: AntdInferencer,
              canDelete: true,
            },
          ]}
          Title={Title}
          Header={Header}
          Sider={Sider}
          Footer={Footer}
          Layout={Layout}
          OffLayoutArea={OffLayoutArea}
          authProvider={authProvider}
          LoginPage={AuthPage}
        >
          <Component {...pageProps} />
        </Refine>
      </ColorModeContextProvider>
    </>
  );
}

export default MyApp;
