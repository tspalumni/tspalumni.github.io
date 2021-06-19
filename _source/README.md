# TSP Alumni Website


## Development

This project uses [HarpJs](http://harpjs.com/) to generate static site and deploy as Github page. 


1. Clone 
 
       git clone https://github.com/tspalumni/tspalumni.github.io

2. Install harp

        npm install -g harp 
        
3. Run

        harp . --port 4000
        
4. Hit http://locahost:4000


## Deployment 

The site is hosted at https://tspalumni.github.io 

1. Clone tspalumni.github.io repository

       git clone https://github.com/tspalumni/tspalumni.github.io


2. Change directory to tsp-web repo 

      cd tsp-web

3. Compile static sites using Harp

      harp . ../tspalumni.github.io

4. Push your changes and it will be available to users. 

        
