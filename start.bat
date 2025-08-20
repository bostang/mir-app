@echo off
start "backend" cmd /k "cd backend && npm start"
start "frontend" cmd /k "cd frontend && npm start"