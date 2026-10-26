# A scrollytelling story map, with MapLibre GL JS 6

This repository is a template for a scrollytelling story map. A reader scrolls down through panels of text. When a panel reaches the middle of the screen, the map moves to that panel's view. The map can also fade a layer in or out at that moment. A chapter can also let the reader explore the map with the mouse.

See the example: https://ubc-geos472-fall2026.github.io/maplibre-storymap/

This repository is the class copy of the [MapLibre Storytelling](https://github.com/opengeos/maplibre-gl-storymaps) template by opengeos. This copy loads MapLibre GL JS 6.15.0.

## What is in this repository

| File | What it does | Do you edit it? |
|---|---|---|
| `config.js` | Holds your story: the basemap, the title, and one entry for each chapter. | Yes. Most of your work goes here. |
| `index.html` | The page that readers open. It reads `config.js`, draws the map and the panels, and moves the map as the reader scrolls. It also holds the example's data layers and its mouse interaction. | Yes, to add your own data and your own interaction (see below). |
| `helper.html` | A map that prints the view you are looking at, ready to copy into `config.js`. | No. You only use it. |
| `LICENSE` | The template's licence (MIT). | No. Keep it. |
| `.nojekyll` | Tells GitHub Pages to serve every file as it is. | No. |

## How it works

1. `index.html` reads the settings and the list of chapters in `config.js`.
2. It draws the map, then one text panel for each chapter, one below the other.
3. A small library called scrollama watches the panels. When a panel reaches the middle of the screen, that chapter becomes "active".
4. For the active chapter, the map moves to that chapter's `location`. The map then changes the opacity of each layer named in the chapter's `onChapterEnter` list. (Opacity is how solid a layer is. 0 is invisible. 1 is fully visible.)
5. When a panel leaves the middle of the screen, the map changes the layers named in that chapter's `onChapterExit` list.

Scrolling changes the chapter. In the example, the second chapter also lets the reader move the mouse over a land use area to see its name and planning status (see "Add interactivity to a chapter").

## Make your own copy

1. On this repository's GitHub page, click the green `Use this template` button, then `Create a new repository`.
2. Under `Owner`, choose your own account. Type a `Repository name`, for example `my-story-map`. Choose `Public`: GitHub Pages needs a public repository on a free account. Click `Create repository`.
3. In your new repository, click `Settings` (in the row of tabs near the top), then `Pages` (in the list on the left). Under `Build and deployment`, set `Source` to `Deploy from a branch`. Set the branch to `main` and the folder to `/ (root)`. Click `Save`.
4. Wait a few minutes (GitHub says publishing can take up to 10 minutes). Your story is then at `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`.

Each time you commit a change, GitHub Pages publishes your site again. Publishing again also takes a few minutes.

For Exploratory Lab 2, this copy in your own account is where your map is shown. Also put a copy of your files in your folder in the class organization, as the assignment's Deliverables section says.

## Edit and add files on GitHub

- **To edit a file:** open it in your repository, click the pencil icon (`Edit this file`), make your change, then click `Commit changes`. In the box that opens, leave `Commit directly to the main branch` selected. Click `Commit changes` again.
- **To add a file** (for example your GeoJSON or an image): click `Add file`, then `Upload files`, drag the file in, then click `Commit changes`. To put files in a folder, first make that folder on your computer, for example a folder named `data`. Put your files in it. Then drag the whole folder onto the `Upload files` page.

## Tell your own story

Open `config.js`. Make all your changes between `var config = {` and the last `};`.

Text in `config.js` goes between two straight quote marks, as in `'Chapter two.'`. Inside such text, write an apostrophe as `\'`, for example `'UBC\'s campus'`. A plain `'` would end the text too early. Then the page would be blank.

### The settings at the top

| Setting | What it does |
|---|---|
| `style` | The address of the basemap style. The example uses OpenFreeMap's Liberty, which needs no account and no key. Other keyless styles: `https://tiles.openfreemap.org/styles/positron` (pale) and `https://tiles.openfreemap.org/styles/bright`. |
| `showMarkers`, `markerColor` | `true` puts a marker at the centre of each chapter's view, in the colour set by `markerColor`. `false` shows no marker. |
| `inset`, `insetStyle`, `insetPosition`, `insetZoom`, `insetOptions` | The small overview map in a corner: on or off, its style, its corner (`'top-left'`, `'top-right'`, `'bottom-left'` or `'bottom-right'`), its zoom (`insetZoom`), and the colour of its marker (`insetOptions: { markerColor: 'orange' }`). |
| `theme` | The colour of the panels: `'light'` or `'dark'`. |
| `use3dTerrain` | Leave it `false`. `true` turns on 3D terrain, but the template's terrain tiles cover only a small area of the Alps, so near Vancouver the map stays flat. |
| `auto` | `true` moves through the chapters by itself. After the last chapter, the story starts again at the first chapter. The example leaves it `false`. |
| `title`, `subtitle`, `byline` | The text at the top of the page. |
| `footer` | The text at the bottom. It may contain HTML, such as links. Credit your data and your basemap here. |

### The chapters

`chapters` is a list. Each chapter is one block between `{` and `}`, with a comma after its closing `}` when another chapter follows. Copy a whole block to add a chapter. Delete a whole block to remove one.

| Setting | What it does |
|---|---|
| `id` | A short name for the chapter, with no spaces. Each chapter needs its own `id`. |
| `alignment` | Where the panel sits: `'left'`, `'center'`, `'right'` or `'full'`. |
| `hidden` | `true` keeps the panel invisible but still moves the map. Usually `false`. |
| `title` | The chapter's heading. |
| `image` | The path of an image to show in the panel, for example `'./images/my-photo.jpg'`, or `''` for none. Upload your image files to the repository first. |
| `description` | The chapter's text. HTML is allowed, for example `<br>` for a new line or `<a href="…">…</a>` for a link. |
| `location` | The map's view for this chapter: `center` as `[longitude, latitude]`, `zoom`, `pitch` (tilt, in degrees) and `bearing` (rotation, in degrees). Use `helper.html` to get these numbers. |
| `mapAnimation` | How the map moves to the view: `'flyTo'` (a curved flight), `'easeTo'` (a smooth slide) or `'jumpTo'` (no movement). |
| `rotateAnimation` | `true` slowly turns the map once it arrives. |
| `onChapterEnter`, `onChapterExit` | Lists of layers to fade when the chapter becomes active, or stops being active. Each entry looks like `{ layer: 'landuse-fill', opacity: 0.6, duration: 1500 }`: `layer` is the layer's `id` from `index.html`, `opacity` goes from 0 (invisible) to 1 (fully visible), and `duration` (optional) is in milliseconds. |
| `callback` | The name of a JavaScript function to run when the chapter becomes active, or `''` for none. See "Run your own code at a chapter". |

### Get a chapter's view with helper.html

1. Open `helper.html` on your GitHub Pages site, for example `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/helper.html`.
2. Move the map to the view you want: drag to pan and scroll to zoom. To turn or tilt the map, right-click and drag, or hold `Ctrl` (on a Mac, `control`) and drag.
3. Click `Copy to Clipboard`. The button changes to `Copied!` for two seconds. If the button does not change, select the text in the grey box with the mouse. Copy the selected text (Ctrl+C, or Cmd+C on a Mac).
4. In `config.js`, select the chapter's whole `location: { … }`, from `location:` to its closing `}`. Paste the copied text over the selection (Ctrl+V, or Cmd+V on a Mac). Keep the comma after the closing `}`.

## Add your own data

The example's second chapter fades in UBC's land use areas. This section first shows how the fade-in works. Then the section shows how to add your own GeoJSON as another layer.

1. **The layer starts invisible.** In `index.html`, find `map.on("load", function () {`. Just after it, the example adds a source and two layers. Here are the source and the first layer:

   ```js
   map.addSource('landuse', {
       type: 'geojson',
       data: 'https://raw.githubusercontent.com/UBCGeodata/ubc-geospatial-opendata/master/ubcv/planning/geojson/ubcv_landuse.geojson'
   });
   map.addLayer({
       id: 'landuse-fill',
       type: 'fill',
       source: 'landuse',
       paint: { 'fill-color': …, 'fill-opacity': 0 }
   });
   ```

   Above, `…` stands for a `match` expression in `index.html` that gives each planning status its own colour (see "Add interactivity to a chapter").

   `'fill-opacity': 0` makes the layer invisible when the page opens.

2. **A chapter fades it in and out.** In `config.js`, the second chapter has:

   ```js
   onChapterEnter: [ { layer: 'landuse-fill', opacity: 0.6, duration: 1500 } ],
   onChapterExit: [ { layer: 'landuse-fill', opacity: 0 } ]
   ```

3. **Your own data:** upload your GeoJSON file to the repository, for example as `data/my-data.geojson`. In `index.html`, copy the `map.addSource('landuse', …)` block and the `map.addLayer` block whose `id` is `'landuse-fill'`. Paste the copies on the line just before `// An outline that shows only the area under the mouse`. In the copies, make these changes:
   - Change `data:` to `'./data/my-data.geojson'`.
   - Change the source's name, `'landuse'`, to a name of your own. `'landuse'` appears twice: once in `map.addSource` and once after `source:`.
   - Change the layer's `id` to a name of your own.
   - Replace the `'fill-color'` value, from `['match', …` to `'#999999']`, with one colour, for example `'#3388ff'`. The example's colours use the `OTHER` field, which your data does not have.
   - If your data is lines or points, also change `type`, `'fill-color'` and `'fill-opacity'` as the table below shows. For points, replace `'fill-opacity': 0` with both opacity settings from the table, with a comma between them: `'circle-opacity': 0, 'circle-stroke-opacity': 0`.

   Then use your layer's `id` as `layer:` in your chapters' `onChapterEnter` and `onChapterExit`. To fade two layers in one chapter, put one entry for each layer in that chapter's `onChapterEnter` list, with a comma between the two entries. For example, `[ { layer: 'imagery', opacity: 1 }, { layer: 'my-layer', opacity: 0.6 } ]` fades in the satellite imagery and a layer whose `id` is `my-layer`. You can also change or delete the comments (the lines that start with `//`) in your copies.

   To replace the example instead of adding to it, first make your copies (step 3 above, and "To make your own" below if you want a mouseover). Then delete four things in `index.html`: the `landuse` source, the `landuse-fill` and `landuse-hover` layers, and the code from the first `// INTERACTIVITY IN ONE CHAPTER` to the line just before `// The basemap draws trail numbers`. Then, in `config.js`, delete each `{ layer: 'landuse-fill', … }` entry, with the comma after it if there is one, from the second chapter's `onChapterEnter` and `onChapterExit` lists. Keep any entries for your own layers.

Your GeoJSON must use longitude and latitude (EPSG:4326). The layer's `type` decides which paint settings it takes. Start each layer invisible:

| Your data | `type` | Colour setting | Start invisible with |
|---|---|---|---|
| Polygons | `'fill'` | `'fill-color'` | `'fill-opacity': 0` |
| Lines | `'line'` | `'line-color'` | `'line-opacity': 0` |
| Points | `'circle'` | `'circle-color'` | `'circle-opacity': 0` and `'circle-stroke-opacity': 0` |

## Add interactivity to a chapter

The example's second chapter lets the reader explore while they read. Move the mouse over a land use area. The area gets a black outline. A popup (a small box of text) shows the area's name, its land use and its planning status.

Three parts in `index.html` make this work, all inside `map.on("load", …)`:

1. **Colours from the data.** The `landuse-fill` layer colours each area by the `OTHER` field (its planning status) with a `match` expression: `'Existing'` green, `'Expansion'` orange, `'2050'` purple, `'Future 2050+'` pink, and grey for anything else.
2. **An outline that follows the mouse.** A second layer, `landuse-hover`, is a black line drawn from the same source. At first, its `filter` selects the area whose `GLOBALID` is `''` (empty text). No area has that value, so the layer draws nothing until the mouse is over an area.
3. **The mouse listener.** `document.addEventListener('mousemove', …)` runs each time the mouse moves. The listener uses `map.queryRenderedFeatures` to find the land use area under the mouse. If there is one, it sets the outline's filter to that area and shows a `maplibregl.Popup` with the area's `NAME`, `LANDUSE` and `OTHER` values. If there is none, it clears the outline and removes the popup. When the reader scrolls, the code also removes the outline and the popup (`window.addEventListener('scroll', …)`).

The mouse listener does nothing while the land use layer is invisible. So the interaction works only in the second chapter, the one chapter that fades this layer in. The mouse listener also does nothing while the mouse is over a text panel.

Why does the code listen to the whole page (`document`), and not use `map.on('mousemove', …)`? Each chapter has a box that lies on top of the map. The box holds the text panel and an empty space, half a screen tall, below the panel. Where a box lies on top, the mouse is over the box and not over the map. There, `map.on('mousemove', …)` would not run. So the code listens to the whole page. The code then finds which point of the map is under the mouse.

(The map is made with `interactive: false`. So the reader cannot drag or zoom the map. The mouse wheel scrolls the page and changes the chapter.)

**To make your own:** in `index.html`, copy parts 2 and 3. They are the code from `// An outline that shows only the area under the mouse` to the line just before `// The basemap draws trail numbers`. Paste the copy on the line just before `// A SHIFT OF STYLE`.

Leave out the outline if your data is points or lines. Also leave out the outline if your data has no field with a different value for each feature. To leave out the outline, delete the outline layer (its `map.addLayer` block) from your copy. Also delete the three `map.setFilter` lines from your copy: two in the `mousemove` listener and one in the scroll listener. The popup still works. Then skip the third and fourth bullets below.

In the copy, make these changes.

- Change `landuse-fill` to your layer's `id`. This name appears twice, in the `mousemove` listener.
- In the `mousemove` listener, change `'fill-opacity'` to the opacity setting of your layer's type: `'fill-opacity'`, `'line-opacity'` or `'circle-opacity'`.
- Give the outline layer its own `id` in place of `landuse-hover`. This name appears four times. Change the outline layer's `source` to your source's name.
- Change `GLOBALID` to a field in your data that has a different value for each feature. This field name appears five times.
- Change the name `popup` to a name of your own, for example `myPopup`. The code uses this name four times: in `var popup`, in `popup.setLngLat` and in two `popup.remove()` lines. Do not change `maplibregl.Popup`. A comment line also has the word popup. You may leave that word as it is.
- Change `area.NAME`, `area.LANDUSE` and `area.OTHER` in the popup's text to fields from your data. For example, `area.NAME` is the value of the `NAME` field for the area under the mouse. If you show only two fields, delete the third field and the `+ ', ' +` before it.

If two layers with popups are visible in one chapter, their popups can lie on top of each other. Fade in only one layer with a popup in each chapter.

Other ideas: show the popup on a click instead of a mouseover (write `'click'` in place of `'mousemove'`). Or colour each value of one of your data's fields differently, with a `match` expression like the one in part 1.

## Change the whole look at a chapter

The example's third chapter changes the map's whole look. Satellite imagery fades in under the place names. The change works the same way as the land use layer: a layer that starts invisible, and a chapter that fades it in.

In `index.html`, after the land use layers, the example adds a raster source of satellite imagery (EOxCloudless) and a layer `imagery` with `'raster-opacity': 0`. The layer goes under the basemap's first symbol layer (its first layer of icons or text). So place names stay on top. Some other basemap layers also stay on top, such as buildings, bridges and borders. In `config.js`, the third chapter has `onChapterEnter: [ { layer: 'imagery', opacity: 1, duration: 2000 } ]`. Its `onChapterExit` fades the `imagery` layer back to 0.

You can use the same idea with any layer that covers the map: imagery, a historical map served as tiles, or a large polygon layer in one colour. This README does not show how to add a historical map. Ask Luke if you want to try one.

## Run your own code at a chapter

In `index.html`, the template's code is inside `<script type="module">`. In this kind of script, a function you write can be used only inside the same script. The template finds a chapter's `callback` function in `window`, an object that every script on the page can read. So, just before the last `</script>` in `index.html`, write your function and one line that puts the function in `window`. The last `</script>` is the line after `window.addEventListener('resize', scroller.resize);`.

```js
function showSchools() {
    // your code here
}
window.showSchools = showSchools;
```

Then, in `config.js`, in the block of the chapter where your code should run, change `callback: ''` to `callback: 'showSchools'`.

## Test on your own computer

You can test without committing. You need Python and a copy of the files on your computer. To get the copy, click `Code` on your repository's page, then `Download ZIP`. Then unzip the ZIP file, if your computer has not already unzipped it. The unzipped folder is named after your repository, with `-main` at the end. Open a terminal in that folder and run `python -m http.server`. On some computers the command is `python3 -m http.server`. On Windows it may be `py -m http.server`. Then open http://localhost:8000/ in your browser. Changes you make in this copy are not on GitHub. To publish them, upload the changed files to your repository (see "Edit and add files on GitHub").

## When something goes wrong

Open the browser's developer console: press `F12` (on a Mac, `Cmd`+`Option`+`I`), or right-click the page, choose `Inspect`, then the `Console` tab. The console names the file and the line of most problems. The example page also causes yellow warnings about the basemap in the console, such as `Image "office" could not be loaded`. These are not your mistakes. Look for red errors that name `config.js` or `index.html`.

- **The page is blank, or shows no panels.** `config.js` usually has a small typing error: a missing comma between chapters, a missing quote mark, an apostrophe written as `'` and not as `\'` inside text, or a `}` too many or too few. The first red error names `config.js` and the line.
- **The map moves, but your layer never appears.** The console may show `Cannot read properties of undefined (reading 'type')`. Check that `layer:` in `onChapterEnter` is exactly the layer's `id` in `index.html`, with the same capitals. Check that your data's address opens in a browser tab. If the first chapter fades in your layer, scroll down until the top of the first panel reaches the middle of the screen. The first chapter starts only then.
- **Your data appears in the wrong place, or not at all.** It is probably not in longitude and latitude. Convert it to GeoJSON in EPSG:4326, as described in Exploratory Lab 2, under "Data formats".
- **A change does not show on GitHub Pages.** Wait a few minutes after the commit, then reload the page.

## Credits

Template: [MapLibre Storytelling](https://github.com/opengeos/maplibre-gl-storymaps) by opengeos (MIT licence, in `LICENSE`), inspired by [Mapbox Storytelling](https://github.com/mapbox/storytelling). Changed for GEOS 472 at UBC (October 2026): MapLibre GL JS 6.15.0 loaded as a module; scrollama pinned to 3.2.0; a keyless basemap (OpenFreeMap); a three-chapter example on the UBC Vancouver campus with UBC Geodata land use (coloured by planning status, with a mouseover) and EOxCloudless imagery; no stock photographs.

Basemap: OpenFreeMap, OpenMapTiles, © OpenStreetMap contributors. Example data: UBC Geodata. Imagery: EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2024).
