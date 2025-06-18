rm -r dist/
rm *.zip
npx tsc
zip -r lambda-function.zip dist/ node_modules/ package.json