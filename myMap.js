var map;
function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AvKTWSjO1pshQ6xHC9YaVQlDX2wBRuTtNyjU9_GL91NiH5TRgWPlW3DJZU8c4VRd'
    });
    add_pokemon_layer(map);
}

// 1. Define pokemon data format. create mock pokemon data
var map_items = [
    {
        "pokeon_id": 12,
        "expire": 1234567,
        "longitude": -118.1256885
        "latitude": 34.0454723,
    }
]

// 2. Create pokemon image on map
function get_pokemon_layer_from_map_items(map_items) {
    var pushpins = Microsoft.Maps.TestDataGenerator.getPushpins(10, map.getBounds());
    var layer = new Microsoft.Maps.Layer();
    layer.add(pushpins);
    return layer;
}

function add_pokemon_layer(map, map_items) {
    var pokemon_layer = get_pokeon_layer_from_map_items(map_items);
    map.layers.insert(pokemon_layer);
}

// 3. Add pokemon counter and refresh.

// 4. Connect wth REST API
