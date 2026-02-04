git add .
git commit -m "gh page"
git push origin main


npm run build
npm run deploy
npm run dev


move git 

git remote remove origin
git remote add origin https://github.com/jackpatcher/stss-sarabun.git

npm install -D vite-plugin-pwa gh-pages
git push -u origin main