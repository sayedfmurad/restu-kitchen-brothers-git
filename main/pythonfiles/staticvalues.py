restus = {
    "objs":{"kitchenbrothers":
      {
        "s3":"kitchenbrothers"
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
    "build": "next build && next export  ",
    "start": "next start",    
    "pub": "yarn build && aws s3 sync ./out/ s3://kitchenbrothers --profile my"
  },  
  "lang": "de-de",
  "IsOut": False
}
