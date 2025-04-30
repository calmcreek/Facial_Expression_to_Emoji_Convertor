## Face Matching App Setup Guide
# Step 1: Initialize the Vite + React Project

In the terminal:

npm create vite@latest face-matching-app -- --template react

cd face-matching-app

npm install

# Step 2: Install TailwindCSS and Configure

TailwindCSS and its peer dependencies were installed:

tailwind.config.js and postcss.config.js files were created.

Created src/styles.css.

Added "build:css": "postcss src/styles.css -o public/styles.css" into package.json.

Created index.html in the public/ folder.

# Step 3: Install TailwindCSS CLI and Configure

Run the following command to install TailwindCSS CLI:

npm install -D tailwindcss-cli

Initialize TailwindCSS configuration:

npx tailwindcss-cli init -p

Run the development server:

npm run dev

This gave an error. So, rename postcss.config.js to postcss.config.cjs.

Error Fixed:

Install @tailwindcss/postcss:

npm install -D @tailwindcss/postcss

Modify postcss.config.cjs:

module.exports = {

  plugins: {
  
    '@tailwindcss/postcss': {},
    
    autoprefixer: {},
  
  },

}

# Now, everything is set up correctly.

# Step 4: Setting Up Pages

Created src/pages/ where .jsx files are added for different pages required.

These pages are linked and routed in App.jsx.

