var config = {
    // The basemap style. OpenFreeMap's styles need no account and no key.
    style: "https://tiles.openfreemap.org/styles/liberty",

    // A marker at the centre of each chapter's view
    showMarkers: true,
    markerColor: "#3FB1CE",

    // A small overview map in one corner
    inset: true,
    insetStyle: "https://tiles.openfreemap.org/styles/positron",
    insetPosition: "bottom-right", // "top-left", "top-right", "bottom-left" or "bottom-right"
    insetZoom: 3,
    insetOptions: {
        markerColor: "orange"
    },

    // The colour of the story panels: "light" or "dark"
    theme: "light",

    // 3D terrain (off here)
    use3dTerrain: false,

    // Move through the chapters by itself (off here)
    auto: false,

    title: "Three places on the UBC Vancouver campus",
    subtitle: "An example story. Replace it with your own.",
    byline: "By Your Name",
    footer: "Data: <a href='https://github.com/UBCGeodata/ubc-geospatial-opendata' target='_blank'>UBC Geodata</a>. Imagery: EOxCloudless <a href='https://cloudless.eox.at' target='_blank'>https://cloudless.eox.at</a> by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2024). Basemap: <a href='https://openfreemap.org/' target='_blank'>OpenFreeMap</a>, <a href='https://openmaptiles.org/' target='_blank'>OpenMapTiles</a>, © <a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap contributors</a>. Created using the <a href='https://github.com/opengeos/maplibre-gl-storymaps' target='_blank'>MapLibre Storytelling</a> template, inspired by <a href='https://github.com/mapbox/storytelling' target='_blank'>Mapbox Storytelling</a>.",

    // The layers your story can show. Each layer starts invisible.
    // A chapter shows a layer when the layer's id is in the chapter's show list.
    layers: [
        {
            id: "landuse",
            type: "fill",
            data: "https://raw.githubusercontent.com/UBCGeodata/ubc-geospatial-opendata/master/ubcv/planning/geojson/ubcv_landuse.geojson",
            paint: {
                // A colour for each planning status in the data's OTHER field
                "fill-color": ["match", ["get", "OTHER"],
                    "Existing", "#1b9e77",
                    "Expansion", "#d95f02",
                    "2050", "#7570b3",
                    "Future 2050+", "#e7298a",
                    "#999999"]
            },
            // The fields to show in a popup when the mouse is over an area
            popup: ["NAME", "LANDUSE", "OTHER"],
            // A black outline around the area under the mouse
            outline: true
        }
    ],

    // The chapters, in the order a reader scrolls through them
    chapters: [
        {
            alignment: "left",
            title: "The Geography Building",
            description: "Chapter one. The UBC Vancouver campus is on the traditional, ancestral and unceded territory of the <a href='https://www.musqueam.bc.ca/' target='_blank'>xʷməθkʷəy̓əm (Musqueam)</a> people.",
            location: { center: [-123.2561, 49.2660], zoom: 16, pitch: 45, bearing: -20 }
            // No show line: this chapter shows no layers
        },
        {
            alignment: "right",
            title: "Land use areas on the campus",
            description: "Chapter two. UBC land use areas fade in. Each colour shows UBC's planning status for the area: green for existing, orange for expansion, purple for 2050 and pink for future (2050 and later). Move the mouse over an area to see its name. In this chapter, you can also drag the map and zoom with the + and − buttons.",
            location: { center: [-123.245, 49.26], zoom: 13, pitch: 0, bearing: 0 },
            // The layer landuse, at opacity 0.6. (show: ["landuse"] would show it fully.)
            show: { landuse: 0.6 },
            // The reader can move and zoom the map in this chapter
            exploreAllowed: true
        },
        {
            alignment: "center",
            title: "Toward the water, from above",
            description: "Chapter three. The map changes to a second style: satellite imagery with place names on top. If you scroll back up, the map changes back to the first style. The imagery is made from many satellite pictures from 2024.",
            location: { center: [-123.262, 49.263], zoom: 14, pitch: 30, bearing: 40 },
            // This chapter's own style, in place of the style at the top
            style: "./satellite-style.json"
        }
    ]
};

// Your own functions go below this line (see "Run your own code at a chapter" in README.md).
