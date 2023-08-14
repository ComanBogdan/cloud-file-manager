/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  safelist: [
    // generate all 100 width breakpoints https://github.com/tailwindlabs/tailwindcss/discussions/7908
    ...[...Array(100).keys()].flatMap(i => [`w-[${i}%]`])
  ]
};
