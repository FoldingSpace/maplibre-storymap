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

    title: "Places on and around the UBC Vancouver campus",
    subtitle: "An example story. Replace it with your own.",
    byline: "By Your Name",
    footer: "Data: <a href='https://github.com/UBCGeodata/ubc-geospatial-opendata' target='_blank'>UBC Geodata</a>. Imagery: EOxCloudless <a href='https://cloudless.eox.at' target='_blank'>https://cloudless.eox.at</a> by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2024). Elevation (chapter four): Terrain Tiles, accessed on 29 October 2026 from <a href='https://registry.opendata.aws/terrain-tiles' target='_blank'>https://registry.opendata.aws/terrain-tiles</a>. Videos: Musqueam Indian Band (chapter five) and Metro Vancouver (chapter six), on Vimeo. Basemap: <a href='https://openfreemap.org/' target='_blank'>OpenFreeMap</a>, <a href='https://openmaptiles.org/' target='_blank'>OpenMapTiles</a>, © <a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap contributors</a>. Created using the <a href='https://github.com/opengeos/maplibre-gl-storymaps' target='_blank'>MapLibre Storytelling</a> template, inspired by <a href='https://github.com/mapbox/storytelling' target='_blank'>Mapbox Storytelling</a>.",

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
            description: "Chapter one. The marker shows the Geography Building. The UBC Vancouver campus is on the traditional, ancestral and unceded territory of the <a href='https://www.musqueam.bc.ca/' target='_blank'>xʷməθkʷəy̓əm (Musqueam)</a> people.",
            location: { center: [-123.2561, 49.2660], zoom: 16, pitch: 45, bearing: -20 }
            // No show line: this chapter shows no layers
        },
        {
            alignment: "right",
            title: "Land use areas on the campus",
            description: "Chapter two. UBC land use areas fade in. Each colour shows UBC's planning status for the area. The legend uses the words in UBC's data. Move the mouse over an area to see its name. In this chapter, you can also drag the map and zoom with the + and − buttons.",
            location: { center: [-123.245, 49.26], zoom: 13, pitch: 0, bearing: 0 },
            // The legend: the colours of the landuse layer's paint, with their meaning
            legend: [
                { color: "#1b9e77", label: "Existing" },
                { color: "#d95f02", label: "Expansion" },
                { color: "#7570b3", label: "2050" },
                { color: "#e7298a", label: "Future 2050+" }
            ],
            // The layer landuse, at opacity 0.6. (show: ["landuse"] would show it fully.)
            show: { landuse: 0.6 },
            // The reader can move and zoom the map in this chapter
            exploreAllowed: true
        },
        {
            alignment: "center",
            title: "Toward the water, from above",
            description: "Chapter three. The map changes to a second style: satellite imagery with place names on top. If you scroll back up, the map changes back to the first style. The imagery is made from many satellite pictures from 2024.",
            location: { center: [-123.2639, 49.2670], zoom: 14, pitch: 30, bearing: 40 },
            // This chapter's own style, in place of the style at the top
            style: "./satellite-style.json"
        },
        {
            alignment: "left",
            title: "Elevation and the colours of the imagery",
            description: "Chapter four. This chapter uses the same satellite style as chapter three. The chart below is calculated from the map's view. Each row of the chart is a range of elevation. The colours in a row are the most common colours of the imagery at that elevation. Each colour in a row is clearly different from the others.",
            location: { center: [-123.2580, 49.2690], zoom: 14.5, pitch: 0, bearing: 0 },
            style: "./satellite-style.json",
            exploreAllowed: true,
            showMarker: false,
            // Another web page, shown in the panel
            embed: "./elevation-colours.html",
            embedHeight: 150,
            descriptionAfter: "Move the mouse over the elevation of a row. The map turns almost white outside that range of elevation. Move the mouse over a colour. Only the pixels close to that colour, at that elevation, keep their colour. The chart then shows the hex code of that colour, for example #4a5d3b. On a touch screen, tap an elevation or a colour. Drag the slider to change the saturation of the imagery on the map and in the chart. Saturation is how strong the colours are. The slider starts at +60 %, so the colours are stronger than in chapters three, five and six. In this chapter, you can also drag the map and zoom with the + and − buttons. The chart then changes."
        },
        {
            alignment: "left",
            title: "The Musqueam Declaration",
            description: "Chapter five. In 1976, Musqueam Elders and leaders signed the Musqueam Declaration. In it, the Musqueam people declare that they “hold aboriginal title to our land”. On 10 June 2026, Musqueam marked the Declaration's 50th anniversary. The map's view includes the lands and waters that the Declaration describes, from Howe Sound to the south bank of the Fraser River and out to the centre of Georgia Strait.",
            location: { center: [-123.1996, 49.2303], zoom: 9.3, pitch: 0, bearing: 0 },
            style: "./satellite-style.json",
            showMarker: false,
            showInset: false,
            // A video from Vimeo, shown in the panel
            embed: "https://player.vimeo.com/video/1200153323?dnt=1",
            embedHeight: 215,
            descriptionAfter: "Video: Musqueam Indian Band, <i>Celebrating The 50th Anniversary Of The Musqueam Declaration</i> (2026). Read more on Musqueam's page about <a href='https://www.musqueam.bc.ca/celebrating-the-50th-anniversary-of-the-musqueam-declaration/' target='_blank'>the 50th anniversary</a>, or read <a href='https://www.musqueam.bc.ca/wp-content/uploads/2018/06/musqueam_declaration.pdf' target='_blank'>the Declaration</a> (PDF)."
        },
        {
            alignment: "right",
            title: "Pacific Spirit Regional Park",
            description: "Chapter six. Pacific Spirit Regional Park lies between the campus and the City of Vancouver. Its forests, bog, creeks and beaches are habitat for many plants and animals.",
            location: { center: [-123.2295, 49.2575], zoom: 12.6, pitch: 0, bearing: 0 },
            style: "./satellite-style.json",
            showMarker: false,
            embed: "https://player.vimeo.com/video/490043811?h=45151a6105",
            embedHeight: 215,
            descriptionAfter: "Video: Metro Vancouver, <i>Pacific Spirit Regional Park Profile</i> (2020)."
        }
    ]
};

// Your own functions go below this line (see "Run your own code at a chapter" in README.md).
