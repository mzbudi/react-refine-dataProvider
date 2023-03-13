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
import { postProvider } from "src/dataProvider";

const API_URL1 = "https://jsonplaceholder.typicode.com";
const API_URL2 = "https://jsonplaceholder.typicode.com";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <ColorModeContextProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={{
            default: postProvider(API_URL1),
            data2 : postProvider(API_URL2),
          }}
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
            {
              name: "comments",
              list: AntdInferencer,
              edit: AntdInferencer,
              show: AntdInferencer,
              create: AntdInferencer,
              canDelete: true,
              options: {
                label: "Comments",
                dataProviderName: "data2",
              },
            }
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
