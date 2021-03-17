import * as React from "react";
import Head from "next/head";

type Props = {
  title?: string;
  bgColor: string;
};

const LayoutMobile: React.FunctionComponent<Props> = ({
  children,
  title = "格上租車",
  bgColor,
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div
      className={
        "container force-m w-full mx-auto h-screen block box-border " + bgColor
      }
    >
      {children}
    </div>
  </div>
);

export default LayoutMobile;
