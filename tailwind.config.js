module.exports = {
  theme: {
    extend: {},
    container: {
      padding: "0",
    },
  },
  variants: {},
  plugins: [],

  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    options: {},
  },
};
