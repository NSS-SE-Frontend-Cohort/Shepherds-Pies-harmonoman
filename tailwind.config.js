/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          italianno: ['Italianno', 'cursive'],
          sans: [
            '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            'sans-serif'
          ],
          mono: [
            'source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New',
            'monospace'
          ]
        }
      }
    },
    plugins: []
  }