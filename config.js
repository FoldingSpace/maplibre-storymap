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

    title: 'Three places on the Point Grey campus',
    subtitle: 'An example story. Replace it with your own.',
    byline: 'By Your Name',
    footer: 'Data: UBC Geodata (UBCGeodata/ubc-geospatial-opendata on GitHub). Basemap: OpenFreeMap, OpenMapTiles, © OpenStreetMap contributors. Created using the <a href="https://github.com/opengeos/maplibre-gl-storymaps" target="_blank">MapLibre Storytelling</a> template, inspired by <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a>.',

    // The chapters, in the order a reader scrolls through them
    chapters: [
        {
            id: 'geography',
            alignment: 'left',
            hidden: false,
            title: 'The Geography Building',
            image: '',
            description: 'Chapter one. The map flies here first.',
            location: { center: [-123.2561, 49.2660], zoom: 16, pitch: 45, bearing: -20 },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'landuse',
            alignment: 'right',
            hidden: false,
            title: 'Land use on the campus',
            image: '',
            description: 'Chapter two. A GeoJSON layer (UBC land use) fades in as you scroll here, and fades out as you leave.',
            location: { center: [-123.245, 49.26], zoom: 13, pitch: 0, bearing: 0 },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [ { layer: 'landuse-fill', opacity: 0.6, duration: 1500 } ],
            onChapterExit: [ { layer: 'landuse-fill', opacity: 0 } ]
        },
        {
            id: 'water',
            alignment: 'center',
            hidden: false,
            title: 'Toward the water',
            image: '',
            description: 'Chapter three. The end of the example story.',
            location: { center: [-123.262, 49.263], zoom: 14, pitch: 30, bearing: 40 },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        }
    ]
};
