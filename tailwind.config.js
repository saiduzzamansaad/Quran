/** @type {import('tailwindcss').Config} */
export default {
      content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
      theme: {
        extend: {
          colors: {
            primary: "#059669", // emerald-600
            secondary: "#f59e0b", // amber-500
            softGray: "#e5e7eb",
          },
        },
      },
      plugins: [],
    }

    