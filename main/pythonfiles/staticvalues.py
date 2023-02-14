restus = {
    "objs":{"kitchenbrothers":
      {
        "s3":"kitchenbrothers",
        "cloud":"E1KSPCHH6VV7WO"
      },
      "westendgrillundpizza":
      {
        "s3":"restu",
        "cloud":"EW42NP988OU7X"
      }
    }
  }
package = {    
  "name": "restu-kitchen-brothers",
  "version": "0.1.0",
  "private": True,
  "dependencies": {
    "@next/font": "13.1.4",
    "eslint": "8.32.0",
    "eslint-config-next": "13.1.4",
    "next": "13.1.4",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "yarn config-static && next build && next export  ",
    "start": "next start",    
    "pub": "yarn yarn build && aws s3 sync ./out/ s3://kitchenbrothers --profile my",
    "cloud":"",
    "config-static": "node -e \"let pkg=require('./package.json'); pkg.IsOut=true; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));\""
  },  
  "lang": "de-de",
  "IsOut": False
}
