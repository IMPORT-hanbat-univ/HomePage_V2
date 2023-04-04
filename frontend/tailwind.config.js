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
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
