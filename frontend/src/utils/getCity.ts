export function getCity(): Promise<string> {
    return new Promise((resolve, reject) => {
        const scr = document.createElement("script");
        scr.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA4ozubFKdKRQ12gtyS9rgOWD8KOjUUikY&language=ua`;
        scr.onerror = reject;
        scr.addEventListener('load', () => {
            function successLocation(position: any) {
                // @ts-ignore
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                // @ts-ignore
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'latLng': latlng}, function(results: any, status: any) {
                    // @ts-ignore
                    if (status === google.maps.GeocoderStatus.OK) {
                        var result = results[0];
                        //look for locality tag and administrative_area_level_1
                        var city = "";
                        for(var i=0, len=result.address_components.length; i<len; i++) {
                            var ac = result.address_components[i];
                            if(ac.types.indexOf("locality") >= 0) city = ac.long_name;
                        }
        
                        //only report if we got Good Stuff
                        // eslint-disable-next-line
                        if (city != '') {
                            resolve(city);
                        } else {
                            reject('unable to resolve city')
                        }
                    } else {
                        reject('status from geocode is failed')
                    }
                });
            }
        
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successLocation, reject);
            }
        });
        document.head.appendChild(scr);
    });
}