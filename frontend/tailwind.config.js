/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-gray": "#868e96",
        "preview-gray": "#495057",
        "import-color": "#14D476",
        "tag-text": "#1d211f",
        "tag-bg-color": "#00904B",
      },
      boxShadow: {
        active: "rgb(255, 255, 255) 0px 0px 0px 4px",
        select: "inset rgba(0, 0, 0, 0.03) 0px 0px 4px 0px",
      },
      keyframes: {
        "slide-down": {
          "0%": {
            transform: "translateY(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        "header-fade-in": {
          "0%": {
            opacity: 0,
            height: 0,
          },
          "100%": {
            opacity: 1,
            height: "auto",
          },
        },
      },
      animation: {
        "slide-down": "slide-down 0.5s",
        "header-fade-in": "header-fade-in 0.5s",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
