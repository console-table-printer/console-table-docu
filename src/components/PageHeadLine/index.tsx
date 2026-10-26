import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

import styles from "./styles.module.css";

const ColoredText = ({ text }) => <span className={styles.ColoredWords}>{text}</span>;
const UnColoredText = ({ text }) => <span>{text}</span>;

const GetStartedButton = () => (
  <div className={styles.GetStartButton}>
    <Link to={useBaseUrl("docs")}>GET STARTED</Link>
  </div>
);

const ProductLogo = () => (
  <img
    className={styles.ProductLogoHomePage}
    width={200}
    height={200}
    alt="CTP Logo"
    src={useBaseUrl("img/logo.ico")}
  />
);

const PageHeadLine = () => {
  return (
    <div className={styles.Headline}>
      <div className={styles.HeadlineSub}>
        <h1 className={styles.HeadlineText}>
          <ProductLogo />
          <UnColoredText text="Print" />
          <ColoredText text=" colorful Tables" />
          <UnColoredText text=" on Console, directly from" />
          <ColoredText text=" JSON string" />
        </h1>
        <GetStartedButton />
      </div>
    </div>
  );
};

export default PageHeadLine;
