module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb-base",
  ],

  "parser": "babel-eslint",

  "env": {
    "mocha": true,
    "node": true,
    "browser": 1,
  },

  globals: {
    document: true,
    expect: true,
    sinon: true,
    json: true,
    Promise: true,
    window: true,
    localStorage: true,
  },

  rules: {
    "no-console": "error",
    "semi": ["error", "never"],
    "react/prop-types": "off",
    "class-methods-use-this": "off",
    "import/no-unresolved": "off",
    "import/extensions": "error",
    "no-unused-expressions": "off",
    "no-underscore-dangle": "off",
    "import/no-dynamic-require": "off",
    "import/prefer-default-export": "off",
    "no-nested-ternary": "off",
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "object-curly-newline": "off",
    "prefer-destructuring": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
  }
}
