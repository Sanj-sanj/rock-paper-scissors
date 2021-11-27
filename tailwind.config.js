module.exports = {
  mode: "",
  purge: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        "slide-left": "slide-left 1600ms ease-out",
        "fade-in": "fade-in 1500ms ease-out",
      },
      scale: {
        70: ".7",
      },
      dropShadow: {
        "white-center": "0px 0px 4em rgba(255, 255, 255, 1)",
      },
      transitionProperty: {
        filter: "filter",
      },
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(100%)" },
          "80%": { transform: "translateX(98%)" },
          "100%": { transform: "translateX(0em)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "60%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
