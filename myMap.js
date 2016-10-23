var map;
function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AvKTWSjO1pshQ6xHC9YaVQlDX2wBRuTtNyjU9_GL91NiH5TRgWPlW3DJZU8c4VRd'
    });
    add_pokemon_layer(map_items);
}

// 1. Define pokemon data format. create mock pokemon data
map_items = [
    {
        "pokemon_id": 12,
        "expire": 1477238106,
        "longitude": -118.1881374,
        "latitude": 34.0249581,
    }
]

function get_counter_down_time_from_expire_epoch(epoch) {
    var now_time = new Date().getTime() / 1000;
    var time_left = epoch - now_time;  // unit: second
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

function add_pokemon_layer(map_items) {
    var pokemon_layer = get_pokemon_layer_from_map_items(map_items);
    map.layers.insert(pokemon_layer);
}

// 3. Add pokemon counter and refresh.

// 4. Connect wth REST API
