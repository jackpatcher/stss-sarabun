git add .
git commit -m "fix pwa3  downgrade"
git push origin main


npm run build
npm run deploy
npm run dev