module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          dark: "#639339",
          mid: "#CBE4B4",
          light: "#E5F0DB"
        },
        red: {
          dark: "#BF3B44",
          mid: "#F3BABD",
          light: "#F4E6E7"
        },
        base: {
          gray: {
            700: "#1B1D1E",
            600: "#333638",
            500: "#5C6265",
            400: "#B9BBBC",
            300: "#DDDEDF",
            200: "#EFF0F0",
            100: "#FAFAFA"
          }
        }
      }
    }
  },
  plugins: []
};
