import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-orange': 'rgba(251, 113, 15, 1)',
        'custom-orange-bg': 'rgba(251, 113, 15, .1)',
        'custom-dark': 'rgb(24, 24, 35)',
        accent: '#1fc1c3',
        accent2: '#BB8360',
        'accent-bg': 'rgba(233, 121, 51, 0.19)',
        light2: '#EBEBEB',
        light: '#FFF',
        dark: '#1F1F27',
        'light-text': 'rgba(71, 72, 71, 0.96)',
        'light-text2': '#8A8A8A',
        'light-bg': '#FAFAFA',
        'light-bg2': '#CCCCCC',
        'light-bg-blur': 'rgba(0, 0, 0, 0.20)',
        'light-bg-select': '#F8F8F8',
        'dark-text': 'rgba(255, 255, 255, 0.96)',
        'dark-text2': 'rgba(255, 255, 255, 0.60)',
        'dark-text3': 'rgba(255, 255, 255, 0.80)',
        'discord-purple': '#5865F2',
        'dark-bg2': 'rgba(245, 245, 245, 0.20);',
        'dark-border': 'rgba(235, 235, 235, 0.10);',
        'dark-bg-select': 'rgba(235, 235, 235, 0.10);',
        'dark-slider-bg': 'rgba(238, 238, 238, 0.20)',
        'dark-select-bg': 'rgba(249, 249, 249, 0.10);',
        'accent-purple': '#9565E3',
        'accent-bg-purple': '#9565E31A',
        'accent-green': '#7FC43A',
        'accent-bg-green': '#7FC43A1A',
        'accent-red': '#DC5454',
        'accent-bg-red': '#DC54541A',
        'accent-cyan': '#36C9C9',
        'accent-bg-cyan': '#36C9C91A',
        'bg-blur': '#F5F5F533',
        'green-bg': '#7FC43A1A',

      },
      fontFamily: {
        epilogue: [ 'Epilogue', 'sans-serif' ],
        dmsans: [ 'DMSans', 'sans-serif' ],
      },
    },
  },
  plugins: [],
};
export default config;
