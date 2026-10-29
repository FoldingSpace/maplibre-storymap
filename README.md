# A scrollytelling story map, with MapLibre GL JS 6

This repository is a template for a scrollytelling story map. A reader scrolls down through panels of text. When a panel reaches the middle of the screen, the map moves to that panel's view. The map can also fade a layer in or out at that moment. A chapter can also let the reader explore the map with the mouse.

See the example: https://ubc-geos472-fall2026.github.io/maplibre-storymap/

This repository is the class copy of the [MapLibre Storytelling](https://github.com/opengeos/maplibre-gl-storymaps) template by opengeos. This copy loads MapLibre GL JS 6.15.0.

## What is in this repository

| File | What it does | Do you edit it? |
|---|---|---|
| `config.js` | Holds your story: the basemap, the title, your layers, and one entry for each chapter. | Yes. All your work for the story goes here. |
| `index.html` | The page that readers open. It reads `config.js`, draws the map and the panels, adds your layers, and moves the map as the reader scrolls. | No. Only if you want to run your own code at a chapter (see "Run your own code at a chapter"). |
| `helper.html` | A map that prints the view you are looking at, ready to copy into `config.js`. | No. You only use it. |
| `LICENSE` | The template's licence (MIT). | No. Keep it. |
| `.nojekyll` | Tells GitHub Pages to serve every file as it is. | No. |

## How it works

1. `index.html` reads the settings, the list of layers and the list of chapters in `config.js`.
2. It draws the map, then one text panel for each chapter, one below the other.
3. It adds each layer in the `layers` list to the map. Each layer starts invisible.
4. A small library called scrollama watches the panels. When a panel reaches the middle of the screen, that chapter becomes "active".
5. For the active chapter, the map moves to that chapter's `location`. The map then shows each layer named in the chapter's `show` list, at the opacity given there. (Opacity is how solid a layer is. 0 is invisible. 1 is fully visible.) Every other layer in the `layers` list fades out.

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
| `title` | The chapter's heading. |
| `image` | The path of an image to show in the panel, for example `'./images/my-photo.jpg'`, or `''` for none. Upload your image files to the repository first. |
| `description` | The chapter's text. HTML is allowed, for example `<br>` for a new line or `<a href="…">…</a>` for a link. |
| `location` | The map's view for this chapter: `center` as `[longitude, latitude]`, `zoom`, `pitch` (tilt, in degrees) and `bearing` (rotation, in degrees). Use `helper.html` to get these numbers. |
| `show` | The layers that this chapter shows, each with its opacity, between `{` and `}`. For example, `show: { landuse: 0.6 }` shows the layer whose `id` is `landuse` at opacity 0.6. In `show`, the `id` has no quote marks. To show two layers, put a comma between them: `show: { imagery: 1, landuse: 0.6 }`. `show: {}` shows no layer. Every layer in `layers` that `show` does not name fades out. |
| `fade` | How long the layers take to fade in or out when this chapter becomes active, in milliseconds (1000 milliseconds is one second). Without `fade`, the fade takes 1500 milliseconds. You can leave `fade` out. |

A chapter can also have these settings. The example does not use them.

| Setting | What it does |
|---|---|
| `hidden` | `true` keeps the panel invisible but still moves the map. |
| `mapAnimation` | How the map moves to the view: `'flyTo'` (a curved flight, used when there is no `mapAnimation`), `'easeTo'` (a smooth slide) or `'jumpTo'` (no movement). |
| `rotateAnimation` | `true` slowly turns the map once it arrives. |
| `callback` | The name of a JavaScript function to run when the chapter becomes active. See "Run your own code at a chapter". |

### Get a chapter's view with helper.html

1. Open `helper.html` on your GitHub Pages site, for example `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/helper.html`.
2. Move the map to the view you want: drag to pan and scroll to zoom. To turn or tilt the map, right-click and drag, or hold `Ctrl` (on a Mac, `control`) and drag.
3. Click `Copy to Clipboard`. The button changes to `Copied!` for two seconds. If the button does not change, select the text in the grey box with the mouse. Copy the selected text (Ctrl+C, or Cmd+C on a Mac).
4. In `config.js`, select the chapter's whole `location: { … }`, from `location:` to its closing `}`. Paste the copied text over the selection (Ctrl+V, or Cmd+V on a Mac). Keep the comma after the closing `}`.

## Add your own data

The `layers` list in `config.js` holds the data that your story can show. Each layer is one block between `{` and `}`, with a comma after its closing `}` when another layer follows. Each layer starts invisible. A chapter shows a layer when the layer's `id` is in the chapter's `show` list.

The example has two layers. The layer `landuse` shows UBC's land use areas from a GeoJSON file. The layer `imagery` shows satellite imagery from tiles (see "Change the whole look at a chapter").

| Setting | What it does |
|---|---|
| `id` | A short name for the layer. Use only letters, numbers and `_`, for example `my_layer`. The chapters use this name in `show`. Each layer needs its own `id`. |
| `type` | How the layer is drawn: `'fill'` for polygons, `'line'` for lines, `'circle'` for points, or `'raster'` for tiles of pictures, such as imagery. |
| `data` | The address of a GeoJSON file, or the file's path in your repository, for example `'./data/my-data.geojson'`. |
| `tiles` | For a `'raster'` layer, in place of `data`: the address pattern of the tiles, with `{z}`, `{x}` and `{y}` in it. A `'raster'` layer also has `tileSize` (the size of each tile in pixels, often 256) and `attribution` (the credit that the tile provider asks for). |
| `paint` | The layer's colour, and for lines and points its width or size, between `{` and `}`. Do not set an opacity in `paint`. The chapters set the opacity. |
| `under` | `'labels'` draws the layer under the basemap's place names. You can leave `under` out. |
| `popup`, `outline` | What the reader sees when the mouse is over a feature. You can leave both out. See "Add interactivity to a chapter". |

**To add your own GeoJSON:** upload your GeoJSON file to the repository, for example as `data/my-data.geojson`. In `config.js`, copy the whole `landuse` block in `layers`, from its `{` to its `}`. Paste the copy after the closing `}` of the last layer. Put a comma between the two blocks. In the copy, make these changes:

- Change `id: 'landuse'` to a name of your own, for example `id: 'my_layer'`.
- Change `data:` to `'./data/my-data.geojson'`.
- Replace the whole `paint` setting, from `paint: {` to its closing `},`, with one colour, for example `paint: { 'fill-color': '#3388ff' },`. The example's colours use the `OTHER` field, which your data does not have.
- If your data is lines or points, also change `type` and `paint` as the table below shows.
- Delete the `popup` and `outline` lines, with the comments above them. Or change them (see "Add interactivity to a chapter").

Then put your layer's `id` in the `show` list of each chapter that should show it, for example `show: { my_layer: 0.8 }`.

To replace the example instead of adding to it, first add your own layer. Then delete the `landuse` block from `layers`, with the comma after it. Then delete `landuse: 0.6` from the second chapter's `show` list. The list then reads `show: {}`. You can also name your own layer there.

Your GeoJSON must use longitude and latitude (EPSG:4326). The layer's `type` decides which `paint` settings it takes:

| Your data | `type` | `paint`, for example |
|---|---|---|
| Polygons | `'fill'` | `{ 'fill-color': '#3388ff' }` |
| Lines | `'line'` | `{ 'line-color': '#3388ff', 'line-width': 2 }` |
| Points | `'circle'` | `{ 'circle-color': '#3388ff', 'circle-radius': 5 }` |

The same data can be two layers with two looks. For example, a later chapter could show the land use areas as blue lines. Copy the `landuse` block. Change its `id` to `landuse_lines`. Change its `type` to `'line'`. Change its `paint` to `{ 'line-color': '#3388ff', 'line-width': 2 }`. Then that later chapter has `show: { landuse_lines: 1 }`.

## Add interactivity to a chapter

The example's second chapter lets the reader explore while they read. Move the mouse over a land use area. The area gets a black outline. A popup (a small box of text) shows the area's name, its land use and its planning status.

Two settings in the `landuse` block of `layers` make this work:

- `popup: ['NAME', 'LANDUSE', 'OTHER']` lists the fields of the data to show. The popup shows the first field in bold. The other fields follow on the next line, with commas between them.
- `outline: 'GLOBALID'` names a field with a different value for each area. The area under the mouse gets a black outline.

The colours come from the `paint` setting. A `match` expression colours each area by the `OTHER` field (its planning status): `'Existing'` green, `'Expansion'` orange, `'2050'` purple, `'Future 2050+'` pink, and grey for anything else.

The popup works only while its layer is visible. So in the example, the popup works only in the second chapter, the one chapter that shows the `landuse` layer. The popup does not open while the mouse is over a text panel. When the reader scrolls, the outline and the popup disappear.

(The map is made with `interactive: false`. So the reader cannot drag or zoom the map. The mouse wheel scrolls the page and changes the chapter.)

**To make your own:** in your layer's block in `layers`, add a `popup` line with the names of fields in your data, for example `popup: ['name', 'year'],`. Each name must be exactly a field name in your data, with the same capitals. To add an outline, also add an `outline` line with a field that has a different value for each feature, for example `outline: 'id',`. Leave out the outline if your data is points or lines. Also leave out the outline if your data has no field with a different value for each feature. The popup still works without an outline.

If two layers with a popup are visible in one chapter, then where the two layers overlap, the popup shows the layer that comes first in `layers`. Show only one layer with a popup in each chapter.

Another idea: colour each value of one of your data's fields differently, with a `match` expression like the one in the example's `paint`.

## Change the whole look at a chapter

The example's third chapter changes the map's whole look. Satellite imagery fades in under the place names. The change works the same way as the land use layer: a layer that starts invisible, and a chapter that shows it.

In `config.js`, the `imagery` block in `layers` has `type: 'raster'`. Its `tiles` setting is the address pattern of the EOxCloudless tiles. Its `under: 'labels'` puts the layer under the basemap's first symbol layer (its first layer of icons or text). So place names stay on top. Some other basemap layers also stay on top, such as buildings, bridges and borders. The third chapter has `show: { imagery: 1 }` and `fade: 2000`. When the reader scrolls back up to the second chapter, the imagery fades out, because the second chapter's `show` list does not name `imagery`.

You can use the same idea with any layer that covers the map: imagery, a historical map served as tiles, or a large polygon layer in one colour. This README does not show how to add a historical map. Ask Luke if you want to try one.

## Run your own code at a chapter

In `index.html`, the template's code is inside `<script type="module">`. In this kind of script, a function you write can be used only inside the same script. The template finds a chapter's `callback` function in `window`, an object that every script on the page can read. So, just before the last `</script>` in `index.html`, write your function and one line that puts the function in `window`. The last `</script>` is the line after `window.addEventListener('resize', scroller.resize);`.

```js
function showSchools() {
    // your code here
}
window.showSchools = showSchools;
```

Then, in `config.js`, in the block of the chapter where your code should run, add this line after the `location` line: `callback: 'showSchools',`.

## Test on your own computer

You can test without committing. You need Python and a copy of the files on your computer. To get the copy, click `Code` on your repository's page, then `Download ZIP`. Then unzip the ZIP file, if your computer has not already unzipped it. The unzipped folder is named after your repository, with `-main` at the end. Use the folder that holds `index.html`. Open a terminal in that folder and run `python -m http.server`. On some computers the command is `python3 -m http.server`. On Windows it may be `py -m http.server`. Then open http://localhost:8000/ in your browser. Changes you make in this copy are not on GitHub. To publish them, upload the changed files to your repository (see "Edit and add files on GitHub").

## When something goes wrong

Open the browser's developer console: press `F12` (on a Mac, `Cmd`+`Option`+`I`), or right-click the page, choose `Inspect`, then the `Console` tab. The console names the file and the line of most problems. The example page also causes yellow warnings about the basemap in the console, such as `Image "office" could not be loaded`. These are not your mistakes. Look for red errors that name `config.js` or `index.html`.

- **The page is blank, or shows no panels.** `config.js` usually has a small typing error: a missing comma between chapters or between layers, a missing quote mark, an apostrophe written as `'` and not as `\'` inside text, or a `}` too many or too few. The first red error names `config.js` and the line.
- **The map moves, but your layer never appears.** The console may show `There is no layer with the id "…"`. Check that the name in the chapter's `show` list is exactly the layer's `id` in `layers`, with the same capitals. Check that your data's address opens in a browser tab. If the first chapter fades in your layer, scroll down until the top of the first panel reaches the middle of the screen. The first chapter starts only then.
- **Your data appears in the wrong place, or not at all.** It is probably not in longitude and latitude. Convert it to GeoJSON in EPSG:4326, as described in Exploratory Lab 2, under "Data formats".
- **A change does not show on GitHub Pages.** Wait a few minutes after the commit, then reload the page.

## Credits

Template: [MapLibre Storytelling](https://github.com/opengeos/maplibre-gl-storymaps) by opengeos (MIT licence, in `LICENSE`), inspired by [Mapbox Storytelling](https://github.com/mapbox/storytelling). Changed for GEOS 472 at UBC (October 2026): MapLibre GL JS 6.15.0 loaded as a module; scrollama pinned to 3.2.0; a keyless basemap (OpenFreeMap); the layers and their looks listed in `config.js`, with each chapter's `show` list; a three-chapter example on the UBC Vancouver campus with UBC Geodata land use (coloured by planning status, with a mouseover) and EOxCloudless imagery; no stock photographs.

Basemap: OpenFreeMap, OpenMapTiles, © OpenStreetMap contributors. Example data: UBC Geodata. Imagery: EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2024).
