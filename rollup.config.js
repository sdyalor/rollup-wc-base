import resolve from "@rollup/plugin-node-resolve";
// const resolve = require(`rollup-plugin-pnp-resolve`);
import babel from "@rollup/plugin-babel";
import common from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";

import scss from "rollup-plugin-scss";
import replace from "@rollup/plugin-replace";
import { wasm } from '@rollup/plugin-wasm';

const production = !process.env.ROLLUP_WATCH;
const extensions = [".js", ".jsx", ".ts", ".tsx", ".m.js",".mjs"];
const babelRc = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false /**ie support */,
        // targets: {
        // esmodules: true
        // "chrome": 71
        // ie: 11 /**ie support */
        // },
        // useBuiltIns: 'usage', /**ie support */
        useBuiltIns: false,
        // corejs: 3, /**ie support */
        debug: true,
      },
    ],
    // [
    //   '@babel/preset-env',
    //   {
    //     modules: false,
    //     targets: {
    //       "esmodules": true,
    //       // chrome: 73
    //     },
    //     useBuiltIns: 'entry',
    //     corejs: 3
    //   }
    // ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    // ["@babel/plugin-transform-template-literals", {
    //   "loose": true
    // }],
    ["@babel/plugin-syntax-dynamic-import"],
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    // ['@babel/plugin-transform-arrow-functions', { spec: true }]
    [
      "@babel/plugin-transform-runtime" /** not needed for current browserlist */,
      {
        regenerator: true,
      },
    ],
  ],
};

const babelConf = {
  extensions,
  babelrc: false,
  ...babelRc,
  // exclude: ['node_modules/**']
  exclude: [
    // /@babel(?:\/|\\{1,2})runtime|core-js/,
    // /@webcomponents/,
    // /construct-style-sheets-polyfill/,
    /core-js/,
    /regenerator-runtime/,
    // /core-js\/stable/,
    /@webcomponents\/webcomponentsjs/,
    /whatwg-fetch/,
    /typescript/
    // /(?!(lit-element|lit-html)\/).*/
    // /node_modules\/(?!(lit-element|lit-html)\/).*/
  ],
  // include: [
  // '/src',
  // /(lit-element|lit-html)\/.*/
  // ],
  // babelHelpers: "runtime",
  babelHelpers: "runtime",
};

export default {
  // external:[
  // /core-js\/stable/,
  // /@babel(?:\/|\\{1,2})runtime|core-js/,
  // /@webcomponents\/webcomponentsjs/,
  // /whatwg-fetch/,
  // /@webcomponents/,
  // /node_modules\/(?!(lit-element|lit-html)\/).*/
  // ],
  input: "src/index.tsx",
  output: {
    dir: "dist",
    // format: 'esm',
    name: "app",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    serve({
      host: "0.0.0.0",
      contentBase: "",
      port: 8001,
    }),
    livereload({
      watch: "dist",
    }),
    resolve({ extensions, browser: true }),
    common(
      // {
      // namedExports: {
      // "node_modules/react/index.js": [
      // "Children",
      // "Component",
      // "PropTypes",
      // "createElement",
      // ],
      // "node_modules/react-dom/index.js": ["render"],
      // },
      // }
    ),
    wasm({
      // sync:['./node_modules/libmee/libmee_bg.wasm']
      // publicPath: "string"
    }),
    babel(babelConf),
    // //POSTCSS START
    // postcss({
    //   inject: false, // By default postcss also injects the
    //   plugins:[
    //     // atImport({
    //     //   path: [
    //     //     './theme',
    //     //     './node_modules',
    //     //     './src/theme',
    //     //     path.resolve(__dirname, "..", "node_modules"),
    //     //     path.resolve(__dirname,"node_modules")
    //     //   ]
    //     // }),
    //     postcssPresetEnv({
    //       autoprefixer: { /** ie but not a good idea */
    //         grid: true
    //       },
    //       // "production": [
    //       //   ">0.2%",
    //       //   "not dead",
    //       //   "not op_mini all"
    //       // ],
    //       // "development": [
    //       //   "last 1 chrome version",
    //       //   "last 1 firefox version",
    //       //   "last 1 safari version",
    //       //   "last 1 ie version"
    //       // ],
    //       // browsers: 'IE 11'
    //       // browsers: 'Chrome >= 61 or Safari >= 10.1 or Edge >= 16 or iOS >= 10.3 or Firefox >= 60 or Opera >= 48 or Android >= 61 or ChromeAndroid >= 61 or FirefoxAndroid >= 60 or OperaMobile >= 45 or Samsung >= 8'
    //     })
    //   ],
    //   parser: 'postcss-sass',
    //   extensions:[".sass",".scss",".css"],
    //   extract: false,
    //   minimize: true,
    //   use: [
    //     ['sass', {
    //       includePaths: [
    //         // './theme',
    //         'node_modules',
    //         // './src/theme',
    //         // path.resolve(__dirname, "..", "node_modules"),
    //         // path.resolve(__dirname,"node_modules")
    //       ],
    //     }]
    //   ],
    //   // exclude: ["./node_modules/bootstrap"]
    //   // extensions:[],
    //   // plugins: [],
    //   // modules: true,
    //   // extract: true
    // }),
    // POSTCSS END

    scss({
      // extensions: ['.sass',".scss",".css"],
      // ['/**/*.css', '/**/*.scss', '/**/*.sass']
      // output: "./scc/css/style.css",
      output: false,
      failOnError: true,
      sass: require("sass"),
      // includePaths:[
      // './theme',
      // /.yarn\/unplugged\/@material-list-npm-8.0.0-e6093bab51\/node_modules/
      // "./.yarn/unplugged/@material-list-npm-8.0.0-e6093bab51/node_modules"
      // "./.yarn/unplugged", /** wea loca */
      // ...(
      // readdirSync('./.yarn/unplugged/',{withFileTypes:true})
      // .filter(dirent=>dirent.isDirectory())
      // .map(dirent=> `./.yarn/unplugged/${dirent.name}/node_modules`)
      // )
      // './.yarn/unplugged/@material-**/node_modules/'
      // './src',
      // path.resolve(__dirname, "..", "node_modules"),
      // path.resolve(__dirname,"node_modules")
      // './yarn'
      // ]
    }),

    production && terser({ output: { comments: false, source_map: false } }),

    production &&
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    !production &&
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  watch: {
    clearScreen: false,
  },
};
