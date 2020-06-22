module.exports = {
  // extends: [ 'plugin:vue/essential', 'airbnb-base' ],
  extends: ["plugin:vue/essential"],
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": "off",
    // 'no-debugger': 'on'
  },
  // root: true,
  // env: {
  //   node: true
  // },
  // 'extends': [
  //   'plugin:vue/essential',
  //   'eslint:recommended'
  // ],
  // rules: {
  //   'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  // },
  parserOptions: {
    parser: 'babel-eslint'
  }
};


//解决error: Unexpected console statement (no-console) at src…
// module.exports = {
//   root: true,
//   env: {
//     node: true
//   },
//   'extends': [
//     'plugin:vue/essential',
//     'eslint:recommended'
//   ],
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
//   },
//   parserOptions: {
//     parser: 'babel-eslint'
//   }
// }