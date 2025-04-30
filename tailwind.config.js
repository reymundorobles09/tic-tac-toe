 /** @type {import('tailwindcss').Config} */
 const defaultTheme = require("tailwindcss/DefaultTheme")

 export default {
    content: ["./src/**/*.{html,js,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
            display: ["Poppins", ...defaultTheme.fontFamily.sans]
        },
        colors: {
          primary: "#66c2ff", //F6A64A
          secondary: "#99d6ff",
          third: "#ccebff",
          fourth: "#99d6ff",
          background: "#f2fafd",
          white: "#FBFBFB",
          navy: "#3B6790",
          dark: "#212121"
        },
  
        backgroundImage: {
          'gradient-primary': 'linear-gradient(to left, #99d6ff, #99d6ff)',
          'gradient-secondary': 'linear-gradient(to right, #99d6ff, #ccebff)',
          'gradient-danger': 'linear-gradient(to right, #FF6363, #FF6363)',
          'gradient-theme': 'linear-gradient(to right, #222222, #222222)',
        }
      },
      
    },
    plugins: [],
  }