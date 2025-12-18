# Created React Vite project the the below command.

npm create vite@latest

# Added Tailwind css to the project with the below commands

npm install tailwindcss @tailwindcss/vite

# Within the vite.config.js added below lines od code to connect with tailwind css and backend apis of the study

import tailwindcss from '@tailwindcss/vite'

Within plugins add: tailwindcss()

within the function added: server:{
    proxy:{
      "/todo": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }

# "/todo" is the same path that is the root path for backend APIs initialized it with the same local host server that we have used in the backend.

# Kept both frontend and backend in the same folder and installed below in order to run application using the same command.

npm install concurrently --save-dev

package.json: {
  "scripts": {
    "backend": "cd backend && npm run dev",
    "frontend": "cd frontend && npm run dev",
    "dev": "concurrently \"npm run backend\" \"npm run frontend\""
  }
}

# Installed Axios in order to fetch the backend apis

npm i axios