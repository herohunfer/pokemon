var map_manager = {
    "map": null,
    "map_items": []
}

map_manager.map_items = [
    {
        "pokemon_id": 12,
        "expire": 1477238106,
        "longitude": -118.1881374,
        "latitude": 34.0249581,
    }
]

function loadMapScenario() {
    map_manager.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AvKTWSjO1pshQ6xHC9YaVQlDX2wBRuTtNyjU9_GL91NiH5TRgWPlW3DJZU8c4VRd'
    });
    add_pokemon_layer();
}

// 1. Define pokemon data format. create mock pokemon data
function get_counter_down_time_from_expire_epoch(epoch) {
    var now_time = new Date().getTime() / 1000;
    var time_left = epoch/1000 - now_time;  // unit: second
    var second = Math.floor(time_left % 60);
    var minute = Math.floor(time_left / 60);
    return minute+":"+second;
}

// 2. Create pokemon image on map
function get_pokemon_layer_from_map_items(map_items) {
    var pushpins = [];
    for (var i in map_items) {
       var map_item = map_items[i];
       var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(map_item["latitude"], map_item["longitude"]), 
                                                { icon: 'images/pushpin_images/pokemon/' + map_item['pokemon_id'] + '.png',
                                                  title: get_counter_down_time_from_expire_epoch(map_item['expire'])}); 
        pushpins.push(pushpin);
    }
    var layer = new Microsoft.Maps.Layer();
    layer.add(pushpins);
    return layer;
}

function add_pokemon_layer() {
    var pokemon_layer = get_pokemon_layer_from_map_items(map_manager.map_items);
    map_manager.map.layers.insert(pokemon_layer);
}

// 3. Add pokemon counter and refresh.
function reresh_pokemon_layer() {
    // Prepare new layer
    var pokemon_layer = get_pokemon_layer_from_map_items(map_manager.map_items);
    // Remove old layer
    map_manager.map.layers.clear();
    // Add new layer
    map_manager.map.layers.insert(pokemon_layer);
}


// 4. Connect wth REST API
function refresh_pokemon_data() {
    // Get boundary for current map view
    var bounds = map_manager.map.getBounds();
    
    // Request pokemons in current map view
    var apigClient = apigClientFactory.newClient();
    var params = {
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        west: bounds.getWest(),
        east: bounds.getEast()
    };
    var body = {};
    var additionalParams = {};
    console.log(params);
    apigClient.mapPokemonsGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            map_manager.map_items = result.data;
        }).catch( function(result){
            //This is where you would put an error callback
            console.log(result);
        });
    }

window.setInterval(refresh_pokemon_data, 1000);

window.setInterval(reresh_pokemon_layer, 1000);
