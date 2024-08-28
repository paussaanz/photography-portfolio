function initMap() {
    console.log("map.js loaded")
    if (typeof locations !== 'undefined' && locations) {
        const map = new google.maps.Map(document.getElementById('google-map'), {
            zoom: 6,
            center: new google.maps.LatLng(locations[0].lat, locations[0].lng),
            /*styles: [{
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{"saturation": "-100"}]
            }, {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{"saturation": -100}, {"lightness": "50"}, {"visibility": "off"}]
            }, {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{"saturation": "-100"}]
            }, {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            }, {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [{"lightness": "30"}]
            }, {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [{"lightness": "40"}]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{"saturation": -100}, {"visibility": "simplified"}]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{"lightness": -25}, {"saturation": -100}]
            }],*/
            mapTypeControl: false
        });

        const latlngbounds = new google.maps.LatLngBounds();
        const infowindow = new google.maps.InfoWindow();

        $.each(locations, function (index, location) {
            console.log(location)
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(location.lat, location.lng),
                animation: google.maps.Animation.DROP,
                map: map,
                icon: ''
            });

            let infoContent = '<h6 class="mx-3 mt-4">' + location.titulo + '</h6>' +
                '<p class="mb-4 mx-3">' + location.address + '</p>';
            marker.addListener('click', function () {
                infowindow.setContent(infoContent);
                infowindow.open(map, marker);
            });
            latlngbounds.extend(marker.position);
        });

        map.addListener('click', function () {
            if (infowindow) {
                infowindow.close();
            }
        });

        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
    }
}