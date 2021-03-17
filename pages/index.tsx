import * as React from "react";
import Layout from "../components/Layout";
import { NextPage } from "next";
import getConfig from "next/config";
import styled, { withTheme } from "styled-components";

const Wrap = styled.div`
  color: ${(props) => props.theme.main};
`;

const IndexPage: NextPage = () => {
  return (
    <Wrap>
      <Layout title="This is a template">
        <h1>Let's rock it!</h1>
      </Layout>
    </Wrap>
  );
};

IndexPage.getInitialProps = async () => {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  return { serverRuntimeConfig, publicRuntimeConfig };
};

export default withTheme(IndexPage);
