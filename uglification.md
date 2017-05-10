# Uglification

Uglify CSS/Javascript in the command line using:

- [uglifycss](https://www.npmjs.com/package/uglifycss)
- [uglify-js](https://www.npmjs.com/package/uglify-js)

Both of these packages will need to be installed globally on the system.

```bash
# uglifycss --output output_file_name.css input_file.css
uglifycss --output screen.css screen.css

# uglifyjs input_file.js [--options] --output output_file_name.js
uglifyjs main.js --compress --mangle --output main.js
```
