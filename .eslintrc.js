module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint"
  ],
  "globals": {},
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
    "import",
    "prettier",
    "@typescript-eslint",
  ],
  "rules": {
    "prettier/prettier": ["error"],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
    "react/destructuring-assignment": "off",
    "react/prop-types": ["off", {}],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/named": "off",
    "import/export": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.test.*", "**/*.spec.*"]}],
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".ts", ".jsx", ".tsx"]
      }
    },
    "import/extensions": [".js", ".ts", ".jsx", ".tsx"]
  }
};