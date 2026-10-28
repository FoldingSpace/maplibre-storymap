var config = {
    // The basemap style. OpenFreeMap's styles need no account and no key.
    style: 'https://tiles.openfreemap.org/styles/liberty',

    // A marker at the centre of each chapter's view
    showMarkers: true,
    markerColor: '#3FB1CE',

    // A small overview map in one corner
    inset: true,
    insetStyle: 'https://tiles.openfreemap.org/styles/positron',
    insetPosition: 'bottom-right', // 'top-left', 'top-right', 'bottom-left' or 'bottom-right'
    insetZoom: 3,
    insetOptions: {
        markerColor: 'orange'
    },

    // The colour of the story panels: 'light' or 'dark'
    theme: 'light',

    // 3D terrain (off here)
    use3dTerrain: false,

    // Move through the chapters on its own (off here)
    auto: false,

    title: 'Three places on the UBC Vancouver campus',
    subtitle: 'An example story. Replace it with your own.',
    byline: 'By Your Name',
    footer: 'Data: UBC Geodata (UBCGeodata/ubc-geospatial-opendata on GitHub). Imagery: EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2024). Basemap: OpenFreeMap, OpenMapTiles, © OpenStreetMap contributors. Created using the <a href="https://github.com/opengeos/maplibre-gl-storymaps" target="_blank">MapLibre Storytelling</a> template, inspired by <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a>.',

    // The layers your story can show. Each layer starts invisible.
    // A chapter shows a layer when the layer's id is in the chapter's show list.
    layers: [
        {
            id: 'landuse',
            type: 'fill',
            data: 'https://raw.githubusercontent.com/UBCGeodata/ubc-geospatial-opendata/master/ubcv/planning/geojson/ubcv_landuse.geojson',
            paint: {
                // A colour for each planning status in the data's OTHER field
                'fill-color': ['match', ['get', 'OTHER'],
                    'Existing', '#1b9e77',
                    'Expansion', '#d95f02',
                    '2050', '#7570b3',
                    'Future 2050+', '#e7298a',
                    '#999999']
            },
            // The fields to show in a popup when the mouse is over an area
            popup: ['NAME', 'LANDUSE', 'OTHER'],
            // A field with a different value for each area. The area under the mouse gets a black outline.
            outline: 'GLOBALID'
        },
        {
            id: 'imagery',
            type: 'raster',
            tiles: 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2024_3857/default/g/{z}/{y}/{x}.jpg',
            tileSize: 256,
            attribution: 'EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2024)',
            // Draw this layer under the basemap's place names
            under: 'labels'
        }
    ],

    // The chapters, in the order a reader scrolls through them
    chapters: [
        {
            id: 'geography',
            alignment: 'left',
            title: 'The Geography Building',
            image: '',
            description: 'Chapter one. The map flies here first.',
            location: { center: [-123.2561, 49.2660], zoom: 16, pitch: 45, bearing: -20 },
            // No layers in this chapter
            show: {}
        },
        {
            id: 'landuse',
            alignment: 'right',
            title: 'Land use areas on the campus',
            image: '',
            description: 'Chapter two. UBC land use areas fade in. Each colour shows UBC\'s planning status for the area: green for existing, orange for expansion, purple for 2050 and pink for future (2050 and later). Move the mouse over an area to see its name.',
            location: { center: [-123.245, 49.26], zoom: 13, pitch: 0, bearing: 0 },
            // The layer landuse, at opacity 0.6
            show: { landuse: 0.6 }
        },
        {
            id: 'water',
            alignment: 'center',
            title: 'Toward the water, from above',
            image: '',
            description: 'Chapter three. The map changes its whole look: satellite imagery fades in under the place names, and fades out if you scroll back up.',
            location: { center: [-123.262, 49.263], zoom: 14, pitch: 30, bearing: 40 },
            // The layer imagery, fully visible. The fade takes 2000 milliseconds (2 seconds).
            show: { imagery: 1 },
            fade: 2000
        }
    ]
};
