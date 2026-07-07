@echo off
start cmd /k "cd ./frontend && npm start"
start cmd /k "cd ./backend/api && nodemon index.js"
