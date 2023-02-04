/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      "dancingScript": "Dancing Script",
      "Pacifico": "Pacifico",
      "LeckerliOne": "Leckerli One",
    }
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
