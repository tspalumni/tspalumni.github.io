# TSP Alumni Association Web


## Development

This repository uses [HarpJs](http://harpjs.com/) to generate static site and deploy as Github Pages


1. Clone 
 
        git clone https://github.com/tspalumni/tspalumni.github.io

2. Install harp

        npm install -g harp@0.31.0
        
3. Run

        harp . --port 4000
        
4. Open http://localhost:4000


5. After you have made changes, push to `master`:

        git add .
        git commit -m "<meaningful commit message>"
        git push origin master

6. That's it. The **Publish site** GitHub Action (`.github/workflows/publish.yml`) builds the site with Harp 0.31
   and publishes it to the `gh-pages` branch, which is served at https://tspalumni.org. Watch it run under the
   repository's **Actions** tab; it takes about a minute. You can also start it by hand from that tab
   (**Publish site**, then **Run workflow**).

Note: install Harp for local preview with `npm install -g harp@0.31.0`. Newer Harp versions fail on this site.

## Updating the home page slideshows

The three slideshows on the home page read their photos from `slideshows/_data.json`. To add a photo, put the
file in `assets/` (a short name with no spaces) and add an entry with its `src`, `width`, `height`, `alt` (what
the photo shows) and `caption`.
