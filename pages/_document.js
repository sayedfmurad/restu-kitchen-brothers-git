import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body data-bs-spy="scroll" data-bs-smoothScroll="false" data-bs-target="#navbarscroll" data-offset="50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
