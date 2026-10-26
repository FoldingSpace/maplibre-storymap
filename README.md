# A scrolling story map, with MapLibre GL JS 6

This is a template for a "scrollytelling" map. A reader scrolls through text in panels. As each panel arrives, the map flies to a new view and can fade a layer in or out. It is the class copy of the [MapLibre Storytelling](https://github.com/opengeos/maplibre-gl-storymaps) template by opengeos, changed to load MapLibre GL JS 6.15.0, the version we use in class.

Example: https://ubc-geos472-fall2026.github.io/maplibre-storymap/

## Make your own copy

1. On this repository's GitHub page, click `Use this template`, then `Create a new repository`. If there is no such button, click `Fork`, then `Create fork`. Under `Owner`, choose your own account. If you see `Public`, choose it.
2. In your new repository, open `Settings`, then `Pages`. Under `Build and deployment`, set `Source` to `Deploy from a branch`, the branch to `main` and the folder to `/ (root)`. Click `Save`.
3. After a minute or two, your story is at `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

## Tell your own story

- **`config.js`** holds everything you write: the basemap style, the title, and a list of chapters. Each chapter needs its own `id`. Each chapter has a title, a description (HTML is allowed), an optional image, and a `location` (centre as [longitude, latitude], zoom, pitch and bearing).
- **`helper.html`** shows a map. Move it to the view you want for a chapter. Click `Copy to Clipboard`. In `config.js`, replace the chapter's `location: { … }` with it.
- **Your own data:** in `index.html`, inside `map.on("load", …)`, the example adds a GeoJSON source and a layer that starts at opacity 0. In `config.js`, the second chapter's `onChapterEnter` fades that layer in, and its `onChapterExit` fades it out. Replace the example's source and layer with your own. Use your layer's `id` in `onChapterEnter` and `onChapterExit`.
- **Images:** put your own images in the repository and give each chapter's `image` the file's path, for example `'./images/my-photo.jpg'`.

To test on your own computer, serve the folder with a local web server (for example `python -m http.server`), then open http://localhost:8000/.

## Credits

Template: [MapLibre Storytelling](https://github.com/opengeos/maplibre-gl-storymaps) by opengeos (MIT licence, in `LICENSE`), inspired by [Mapbox Storytelling](https://github.com/mapbox/storytelling). Changed for GEOS 472 at UBC (October 2026): MapLibre GL JS 6.15.0 loaded as a module; scrollama pinned to 3.2.0; a keyless basemap (OpenFreeMap); a short example story on the UBC Vancouver campus with UBC Geodata land use; no stock photographs.

Basemap: OpenFreeMap, OpenMapTiles, © OpenStreetMap contributors. Example data: UBC Geodata.
