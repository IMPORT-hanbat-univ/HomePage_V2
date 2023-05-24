/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-gray": "#868e96",
        "preview-gray": "#495057",
        "import-color": "#5856D6",
        "tag-text": "#6B6A9B",
        "tag-bg-color": "#454493",
      },
      boxShadow: {
        active: "rgb(255, 255, 255) 0px 0px 0px 4px",
      },
      keyframes: {
        'slide-down': {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        'header-fade-in': {
          '0%': {
            opacity: 0,
            height: 0,
          },
          '100%': {
            opacity: 1,
            height: 'auto',
          },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.5s',
        'header-fade-in': 'header-fade-in 0.5s'
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
