import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="NFT Dapp." />
        </Head>
        <body className="bg-gray-50 dark:bg-gray-900 dark:text-gray-50 transition-all duration-300 ease-in-out">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
