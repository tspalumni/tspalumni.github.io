# TSP Alumni Association Web


## Development

This repository uses [HarpJs](http://harpjs.com/) to generate static site and deploy as Github Pages


1. Clone 
 
        git clone https://github.com/tspalumni/tspalumni.github.io

2. Install harp

        npm install -g harp 
        
3. Run

        harp . --port 4000
        
4. Hit http://locahost:4000


5. After you have made changes. Push to `master`

        git add .
        git commit -m "<meaningful commit message>"
        git push origin master


6. Compile static sites to directory named `build` in parent 

        harp . ../build

7. Checkout `gh-pages` branch inside tspalumni.github.io repository

        git checkout gh-pages

8. Copy the compiled static sites from `build` directory to `gh-pages` branch

        cp -a ../build/* .
        
9. Remove README.md
        
        rm README.md

10. Push to `gh-pages` remote branch

        git add .
        git commit -m "<meaningful message for your change>"
        git push origin gh-pages

11. You're set. The change has gone live now. 🚀
      
