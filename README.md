# A scrollytelling story map, with MapLibre GL JS 6

This repository is a template for a scrollytelling story map. A reader scrolls down through panels of text. When a panel reaches the middle of the screen, the map moves to that panel's view. The map can also fade a layer in or out, or change its whole style. A chapter can let the reader explore the map with the mouse. You edit only `config.js`.

See the example: https://foldingspace.github.io/maplibre-storymap/

This repository is based off of the [MapLibre Storytelling](https://github.com/opengeos/maplibre-gl-storymaps) template by [opengeos](https://github.com/opengeos), adapted for simplicity and lower-code use. It loads [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) 6.15.0.

## Make your own copy

1. On this repository's GitHub page, click the green `Use this template` button, then `Create a new repository`.
2. Under `Owner`, choose your own account. Type a `Repository name`, for example `my-story-map`. Choose `Public`: [GitHub Pages](https://docs.github.com/en/pages) needs a public repository on a free account. Click `Create repository`.
3. In your new repository, click `Settings` (in the row of tabs near the top), then `Pages` (in the list on the left). Under `Build and deployment`, set `Source` to `Deploy from a branch`. Set the branch to `main` and the folder to `/ (root)`. Click `Save`.
4. Wait a few minutes (GitHub says publishing can take up to 10 minutes). Your story is then at `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`.

## Edit and add files on GitHub

- **To edit a file:** open it in your repository, click the pencil icon (`Edit this file`), make your change, then click `Commit changes...`. In the box that opens, leave `Commit directly to the main branch` selected. Click `Commit changes` again.
- **To add a file** (for example your [GeoJSON](https://geojson.org/) or an image): click `Add file`, then `Upload files`, drag the file in, then click `Commit changes`. To put files in a folder, first make that folder on your computer, for example a folder named `data`. Put your files in it. Then drag the whole folder onto the `Upload files` page.

Each time you commit a change, GitHub Pages publishes your site again. This takes a few minutes.

A path in `config.js` starts at the folder that holds `index.html`. For example, `"./data/my-data.geojson"` is the file `my-data.geojson` in a folder named `data`. `"./my-data.geojson"` is a file in the same folder as `index.html`.

## Tell your own story

Open `config.js`. Make all your changes to the settings between `var config = {` and the last `};`. Your own functions go below the last `};` (see "Run your own code at a chapter").

Text and names in `config.js` go between two straight double quote marks, as in `"Chapter two."`. Inside text, you can write an apostrophe as it is: `"UBC's campus"`. Do not type a double quote mark inside text. For a link inside text, put single quote marks around the address: `"<a href='https://www.ubc.ca'>UBC</a>"`. Use straight quote marks (`"`), not curly ones (`“ ”`). Text pasted from a word processor may have curly ones.

A block is the text between a `{` and its `}`. Inside a block, put a comma between two settings. Put a comma between two blocks. A comma after the last setting or the last block is allowed but not needed. To add a setting to a block, add its line just after the block's `{`. End the line with a comma.

## How it works

1. `index.html` reads `config.js`. It draws the map, and one text panel for each chapter. Each layer in `layers` starts invisible.
2. When a panel reaches the middle of the screen, its chapter becomes active.
3. The map moves to the chapter's `location`. If the chapter has its own `style`, the map changes to that style.
4. The map shows each layer in the chapter's `show` list. Every other layer in `layers` fades out.

## Add a chapter

`chapters` is a list of blocks, one for each chapter. To add a chapter, paste this block just before the `]` that ends `chapters`. Put a comma after the `}` of the block before it.

```js
{
    alignment: "left",
    title: "My chapter",
    description: "My text.",
    location: { center: [-123.25, 49.26], zoom: 14, pitch: 0, bearing: 0 },
    show: ["landuse"]
}
```

Then change its settings. To remove a chapter, delete its whole block and one comma next to it.

| Setting | What it does |
|---|---|
| `alignment` | Where the panel sits: `"left"`, `"center"`, `"right"` or `"full"`. |
| `title` | The chapter's heading. |
| `description` | The chapter's text. HTML is allowed, for example `<br>` for a new line. |
| `image` | The path of an image to show in the panel, for example `"./images/my-photo.jpg"`. Upload the image first. You can leave `image` out. |
| `location` | The map's view: `center` as `[longitude, latitude]`, `zoom`, `pitch` (tilt, in degrees) and `bearing` (rotation, in degrees). Use `helper.html` to get these numbers. |
| `show` | The layers that this chapter shows. `show: ["landuse"]` shows the layer whose `id` is `landuse`, fully visible. For two layers, put a comma between them: `show: ["landuse", "my_layer"]`. To set each layer's opacity, write each `id` with an opacity between `{` and `}`: `show: { landuse: 0.6 }`. Opacity 0 is invisible. Opacity 1 is fully visible. In this form, the `id` has no quote marks. A chapter without `show` shows no layer. |
| `style` | The chapter's own basemap style, in place of the `style` at the top of `config.js`. You can leave `style` out. See "Change the style at a chapter". |

More chapter settings are in "More settings".

### Get a chapter's view with helper.html

1. Open `helper.html` on your GitHub Pages site, for example `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/helper.html`.
2. Move the map to the view you want: drag to pan and scroll to zoom. To turn or tilt the map, right-click and drag, or hold `Ctrl` (on a Mac, `control`) and drag.
3. Click `Copy to Clipboard`. The button changes to `Copied!` for two seconds. If the button does not change, select the text in the grey box with the mouse. Copy the selected text (Ctrl+C, or Cmd+C on a Mac).
4. In `config.js`, select the chapter's whole `location: { … }`, from `location:` to its closing `}`. Paste the copied text over the selection (Ctrl+V, or Cmd+V on a Mac). If there is a comma after the closing `}`, keep it.

## Add your own data

Your GeoJSON must use longitude and latitude ([EPSG:4326](https://epsg.io/4326)). Upload it to your repository, for example as `data/my-data.geojson`. In `config.js`, paste this block just before the `]` that ends `layers`. Put a comma after the `}` of the block before it.

```js
{
    id: "my_layer",
    type: "fill",
    data: "./data/my-data.geojson",
    paint: { "fill-color": "#3388ff" }
}
```

Open the GeoJSON file. Find `"geometry"`. The `"type"` just after it is `"Polygon"`, `"LineString"` or `"Point"` (or the same with `Multi` in front). For polygons, keep the block as it is. For lines or points, change `type` and `paint` as this table shows:

| Your data | `type` | `paint`, for example |
|---|---|---|
| Polygons | `"fill"` | `{ "fill-color": "#3388ff" }` |
| Lines | `"line"` | `{ "line-color": "#3388ff", "line-width": 2 }` |
| Points | `"circle"` | `{ "circle-color": "#3388ff", "circle-radius": 5 }` |

Then put the layer's `id` in the `show` list of each chapter that should show it, for example `show: ["my_layer"]`.

| Setting | What it does |
|---|---|
| `id` | A short name for the layer. Start it with a letter. Use only letters, numbers and `_`. Each layer needs its own `id`. Do not use a name that the basemap already uses, such as `park`, `water` or `building`. A name that starts with `my_` is safe. |
| `type` | How the layer is drawn: `"fill"` for polygons, `"line"` for lines, `"circle"` for points, or `"raster"` for image tiles, such as satellite imagery. |
| `data` | The path of a GeoJSON file in your repository, or the address of a GeoJSON file on the web. |
| `tiles` | For a `"raster"` layer, in place of `data`: the address pattern of the tiles, with `{z}`, `{x}` and `{y}` in it. A `"raster"` layer also has `tileSize` (often 256) and `attribution` (the credit that the tile provider asks for). |
| `paint` | The layer's colour, and for lines and points its width or size. The [MapLibre Style Spec](https://maplibre.org/maplibre-style-spec/layers/) lists the `paint` settings of each `type`. Do not set an opacity in `paint`. The chapters set the opacity. |
| `under` | `"labels"` draws the layer under the basemap's names and icons. Some other basemap layers, such as buildings, also stay on top. You can leave `under` out. |
| `popup`, `outline` | What the reader sees when the mouse is over a feature. You can leave both out. See "Add interactivity to a chapter". |

To colour each value of a field differently, use a [`match` expression](https://maplibre.org/maplibre-style-spec/expressions/#match), as in the `landuse` block's `paint`.

The same data can be two layers, each with its own `type` and `paint`. Each layer needs its own `id`. For example, copy the `landuse` block. Change its `id` to `landuse_lines`. Change its `type` to `"line"` and its `paint` to `{ "line-color": "#3388ff", "line-width": 2 }`. A later chapter with `show: ["landuse_lines"]` then shows the land use areas as blue lines.

To remove the example layer, delete the `landuse` block and one comma next to it. Then delete the second chapter's `show` line, or put your own layer's `id` in it.

## When something goes wrong

The page checks `config.js` when it opens. If it finds a problem, a red box at the top of the page says what the problem is. Fix the first problem in the box first.

The browser's developer console shows the same messages, and sometimes more. To open it, press `F12` (on a Mac, `Cmd`+`Option`+`I`). Or right-click the page, choose `Inspect`, then the `Console` tab. The basemap causes some yellow warnings, such as `Image "office" could not be loaded`. These are not your mistakes.

- **"config.js has a typing error".** The box names a line. The mistake is often at the end of a line just above it: a missing comma, a missing quote mark, or a `}` or `]` too many or too few. If the box says `Invalid or unexpected token` (in Firefox: `illegal character`), look on the named line itself for a curly quote mark (`“` or `”`) in place of a straight one (`"`).
- **A file "was not found".** Check the path in `config.js`: the file's name and its folder. The capital letters in the path must match the file's name and the folder's name. The file's address should open in a browser tab, for example `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/data/my-data.geojson`.
- **A message about `paint`, such as `unknown property "fill-color"`.** The layer's `paint` does not fit its `type`. For example, a `"line"` layer needs `line-color`, not `fill-color`. Use a `paint` from the table in "Add your own data".
- **Your data appears in the wrong place, or not at all.** It is probably not in longitude and latitude. Convert it to GeoJSON in EPSG:4326. Add your data to QGIS. Then right-click its layer in the `Layers` panel, then choose `Export`, then `Save Features As…`. Set `Format` to `GeoJSON` and `CRS` to `EPSG:4326`.
- **A change does not show on GitHub Pages.** Wait a few minutes after the commit. Then reload the page.

## Add interactivity to a chapter

In the example's second chapter, move the mouse over a land use area. The area gets a black outline. A popup (a small box of text) shows the area's name, its land use and its planning status. Two settings in the `landuse` block do this:

- `popup: ["NAME", "LANDUSE", "OTHER"]` lists fields of the data. The popup shows the first field in bold. The other fields follow on the next line, with commas between them.
- `outline: true` draws a black outline around the feature under the mouse.

To add a popup to your own layer, add a `popup` line to its block, with the names of fields in your data, for example `popup: ["name", "year"],`. Each name must be exactly a field name in your data. The capital letters must match. For polygons, you can also add `outline: true,`.

The popup works only in chapters that show its layer. It does not open while the mouse is over a text panel. Show only one layer with a popup in each chapter. Where two such layers overlap, the popup shows only the first one in `layers`.

In a chapter without `exploreAllowed: true`, the reader cannot drag or zoom the map. The mouse wheel, the arrow keys and the scroll bar scroll the story and change the chapter.

To let the reader move and zoom the map in a chapter, add `exploreAllowed: true,` to the chapter's block, as in the example's second chapter. In that chapter, the reader can drag the map, zoom with the `+` and `−` buttons, and double-click to zoom in. On a touch screen, two fingers move and zoom the map. On a touch screen, one finger on the map shows the message "Use two fingers to move the map". The mouse wheel, the arrow keys, the scroll bar and one finger on a touch screen still scroll the story. When the reader scrolls to the next chapter, the map moves to that chapter's view. Write in the chapter's `description` that the reader can move the map.

## Change the style at a chapter

The third chapter has its own style: `style: "./satellite-style.json"`. A style is a file that lists a map's sources and layers. [Maputnik](https://maplibre.org/maputnik/) saves styles in this form. `satellite-style.json` has two sources: the [EOxCloudless](https://cloudless.eox.at) satellite tiles and [OpenFreeMap](https://openfreemap.org/)'s vector tiles. Its first layer draws the imagery. Its other layers draw road names, water names and place names on top.

When the chapter becomes active, the new style replaces the basemap. The basemap does not fade. The layers in `layers` stay on the map. They are visible only if the chapter's `show` list names them. When the reader scrolls back up, the map changes back to the `style` at the top of `config.js`.

**To make your own:** make a style in Maputnik. In Maputnik, click `Save` at the top. The `Save Style` window opens. Click `Save` to save the style as a JSON file. The browser may ask where to save the file and what to name it. If the browser does not ask, the file is in your Downloads folder, named after the style. Upload the file to your repository. In the chapter's block, add a line with the file's path, for example `style: "./my-style.json",`. If the block already has a `style` line, change the path in that line.

To fade imagery in over the basemap, use a layer instead. For example, paste this block just before the `]` that ends `layers`. Put a comma after the `}` of the block before it. A chapter with `show: ["my_imagery"]` then fades the satellite imagery in under the basemap's names, icons and some other layers, such as buildings.

```js
{
    id: "my_imagery",
    type: "raster",
    tiles: "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2024_3857/default/g/{z}/{y}/{x}.jpg",
    tileSize: 256,
    attribution: "EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2024)",
    under: "labels"
}
```

A historical map served as tiles can fade in the same way.

## Run your own code at a chapter

Write your function in `config.js`, below the last `};`. The function can use `map`, the story's MapLibre map. For example:

```js
function showZoom() {
    console.log("The map's zoom is " + map.getZoom());
}
```

Then, in the block of the chapter where the function should run, add the line `callback: "showZoom",`. The message appears in the browser's developer console. The function runs when the chapter becomes active, as the map starts to move.

## Test on your own computer

You can test without committing. You need [Python](https://www.python.org/downloads/) and a copy of the files on your computer. To get the copy, click `Code` on your repository's page, then `Download ZIP`. Unzip the ZIP file, if your computer has not already unzipped it. The unzipped folder is named after your repository, with `-main` at the end. Use the folder that holds `index.html`. Open a terminal in that folder and run `python -m http.server`. On some computers the command is `python3 -m http.server`. On Windows it may be `py -m http.server`. Then open http://localhost:8000/ in your browser. While the server runs, open http://localhost:8000/helper.html to use `helper.html`. On a Mac or on Windows, a path with wrong capital letters still works in this test. On GitHub Pages it does not. Changes you make in this copy are not on GitHub. To publish them, upload the changed files to your repository (see "Edit and add files on GitHub").

## More settings

The settings at the top of `config.js`:

| Setting | What it does |
|---|---|
| `style` | The address of the basemap style. The example uses OpenFreeMap's Liberty, which needs no account and no key. Other keyless styles: `"https://tiles.openfreemap.org/styles/positron"` (pale) and `"https://tiles.openfreemap.org/styles/bright"`. |
| `showMarkers`, `markerColor` | `true` puts a marker at the centre of each chapter's view, in the colour set by `markerColor`. `false` shows no marker. |
| `inset`, `insetStyle`, `insetPosition`, `insetZoom`, `insetOptions` | The small overview map in a corner: on or off, its style, its corner (`"top-left"`, `"top-right"`, `"bottom-left"` or `"bottom-right"`), its zoom, and the colour of its marker (`insetOptions: { markerColor: "orange" }`). |
| `theme` | The colour of the panels: `"light"` or `"dark"`. |
| `use3dTerrain` | Leave it `false`. Near Vancouver the template has no terrain. |
| `auto` | `true` moves through the chapters by itself. After the last chapter, the story starts again at the first chapter. |
| `title`, `subtitle`, `byline` | The text at the top of the page. |
| `footer` | The text at the bottom. It may contain HTML, such as links. Credit your data and your basemap here. |

More settings for a chapter:

| Setting | What it does |
|---|---|
| `hidden` | `true` keeps the panel invisible but still moves the map. |
| `fade` | How long the layers take to fade in or out when this chapter becomes active, in milliseconds (1000 milliseconds is one second). Without `fade`, the fade takes 1500 milliseconds. |
| `mapAnimation` | How the map moves to the view: `"flyTo"` (a curved flight, used when there is no `mapAnimation`), `"easeTo"` (a smooth slide) or `"jumpTo"` (no movement). |
| `rotateAnimation` | `true` slowly turns the map once it arrives. |
| `exploreAllowed` | `true` lets the reader move and zoom the map in this chapter. See "Add interactivity to a chapter". |
| `callback` | The name of your own function to run when the chapter becomes active. See "Run your own code at a chapter". |

## What is in this repository

| File | What it does | Do you edit it? |
|---|---|---|
| `config.js` | Holds your story: the basemap, the title, your layers, your chapters and your own functions. | Yes. All your work for the story goes here. |
| `index.html` | The page that readers open. It reads `config.js`, draws the map and the panels, and moves the map as the reader scrolls. | No. |
| `helper.html` | A map that prints the view you are looking at, ready to copy into `config.js`. | No. You only use it. |
| `satellite-style.json` | The style of the example's third chapter: satellite imagery with place names. | Only if you want to change that chapter's look. |
| `LICENSE` | The template's licence (MIT). | No. Keep it. |

## Credits

Template: [MapLibre Storytelling](https://github.com/opengeos/maplibre-gl-storymaps) by opengeos (MIT licence, in [`LICENSE`](LICENSE)), inspired by [Mapbox Storytelling](https://github.com/mapbox/storytelling). Changed for GEOS 472 at UBC (October 2026): MapLibre GL JS 6.15.0 loaded as a module; scrollama pinned to 3.2.0; a keyless basemap (OpenFreeMap); the layers and their looks listed in `config.js`, with each chapter's `show` list; a `style` setting for each chapter; an `exploreAllowed` setting that lets the reader move and zoom the map in a chapter; problems in `config.js` shown on the page; a three-chapter example on the UBC Vancouver campus with UBC Geodata land use (coloured by planning status, with a mouseover) and EOxCloudless imagery in a second style; no stock photographs.

Basemap: [OpenFreeMap](https://openfreemap.org/), [OpenMapTiles](https://openmaptiles.org/), © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright). Example data: [UBC Geodata](https://github.com/UBCGeodata/ubc-geospatial-opendata). Imagery: EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2024).
