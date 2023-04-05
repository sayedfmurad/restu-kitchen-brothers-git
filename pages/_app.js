import Head from "next/head";
function MyApp({ Component, pageProps }) {
  if(process.browser)
  {
    if (typeof(Storage) === "undefined") 
    return(<h1>Error localStorage</h1>)
  }





  return (    
    <>
    <Head>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"/>    
    </Head>
    <Component {...pageProps} />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" async></script>
    <script   src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" async></script>
    </>
    );
}

export default MyApp
