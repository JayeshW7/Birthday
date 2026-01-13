import Head from "next/head";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { Button } from "../components";

export default function Home() {
  const handleClick = () => {
    Router.push("/didi");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>A Special Birthday Surprise</title>
        <meta name="description" content="Something special awaits..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.welcomeSection}>
          <div className={styles.sparkle}>✨</div>
          <h1 className={styles.title}>
            A <span className={styles.span}>Special</span> Day
          </h1>
          <p className={styles.subtitle}>
            Something magical is waiting for you...
          </p>
          <div className={styles.buttonWrapper}>
            <Button onClick={handleClick} text="Open Your Surprise 🎁" />
          </div>
          <div className={styles.floatingHearts}>
            <span className={styles.heart}>💝</span>
            <span className={styles.heart}>🎈</span>
            <span className={styles.heart}>🎂</span>
            <span className={styles.heart}>🎉</span>
            <span className={styles.heart}>💖</span>
          </div>
        </div>
      </main>
    </div>
  );
}
