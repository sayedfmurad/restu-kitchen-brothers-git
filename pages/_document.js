import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body data-bs-spy="scroll" data-bs-target=".navbar" data-bs-method="position" data-offset="1">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
