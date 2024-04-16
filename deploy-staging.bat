@echo off
git add .
git commit -m "." --no-gpg-sign
git push origin mathswe/staging:mathswe/staging
pause
