import Head from "next/head";

const Layout = ({ section, children }) => {
  return (
    <div>
      <Head>
        <title>Examen</title>
        <link rel="stylesheet" href="/styles/styles.css" />
      </Head>
      <header>
        <h1>{section}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
