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
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
    <link   href={"./mystyles/global.css?v=1"} rel="stylesheet" />
    </Head>
    <Component {...pageProps} />    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </>
    );
}

export default MyApp
