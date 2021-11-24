module.exports = {
  mode: "",
  purge: ["./src/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        "slide-left": "slide-left 1600ms ease-out",
        "fade-in": "fade-in 1500ms ease-out",
      },
      scale: {
        70: ".7",
      },
      boxShadow: {
        "3xl": "0px 0px 220px 100px rgba(219, 219, 219, 0.3)",
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
