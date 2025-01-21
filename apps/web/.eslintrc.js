module.exports = {
  "extends": [
    "prettier",
    "next/typescript",
    "next/core-web-vitals",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "plugins": ["react", "prettier", "import", "@typescript-eslint", "import-alias", "unused-imports"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "tsconfig.json",
    tsconfigRootDir: __dirname,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": "off",
    "react/require-default-props": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/jsx-key": "warn",
    "react/no-unstable-nested-components": "off",
    "react/no-unused-prop-types": "error",
    "react/no-array-index-key": "error",
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".tsx"]
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/ban-ts-comment": 1,
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/prefer-regexp-exec": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/restrict-template-expressions": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        "ignoreVoid": true
      }
    ],
    "@typescript-eslint/unbound-method": [
      "off",
      {
        "ignoreStatic": true
      }
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": false
      }
    ],
    "comma-dangle": ["error", "always-multiline"],
    "no-alert": "off",
    "no-shadow": "off",
    "no-console": "off",
    "no-plusplus": "off",
    "no-unused-vars": "error",
    "no-unreachable": "error",
    "no-underscore-dangle": "off",
    "no-useless-computed-key": "error",
    "no-misleading-character-class": "error",
    "no-restricted-syntax": "error",
    "no-void": [
      "error",
      {
        "allowAsStatement": true
      }
    ],
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "import/no-extraneous-dependencies": "error",
    "import/no-cycle": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": "error",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/role-has-required-aria-props": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/alt-text": "off",
  },
  "overrides": [
    {
      "files": ["**/*.stories.*"],
      "rules": {
        "import/no-anonymous-default-export": "off",
        "import/no-default-export": "off",
        "import/prefer-default-export": [
          "warn",
          {
            "target": "any"
          }
        ]
      }
    }
  ],
  "env": {
    "browser": true
  },
  "ignorePatterns": ["storybook-static"],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "tsconfig.json"
      }
    }
  }
}
