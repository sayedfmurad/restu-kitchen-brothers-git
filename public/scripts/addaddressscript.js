let autocomplete;

    function GetJsonM(m){
        return new Promise((resolve, reject) => {
            var or = window.localStorage.getItem(m)
              or= or==null||or==""?"{}":or
              resolve(JSON.parse(or))
        });
    }
    function initAutocomplete(){
        GetJsonM("menu").then((menu)=>{
            var searchBounds = new google.maps.Circle({
                center: {lat:menu["staticValue"]["latlng"]["lat"], lng:menu["staticValue"]["latlng"]["lng"]},
                radius: 20000 // 20km radius
              });
            autocomplete = new google.maps.places.Autocomplete(
                document.getElementById('autocomplete'),
                {
                    componentRestrictions:{'country':['DE']},
                    fields:['geometry','place_id','address_components',]
                }
            );
            autocomplete.setBounds(searchBounds.getBounds());
            autocomplete.addListener('place_changed',onPlaceChanged)
        })

    }
    let place;
    let mlocation = {"housenumber":"",
                     "street":"",
                     "zipc":"",
                     "administrative_area_level_3":""}
function onPlaceChanged()
{
     place = autocomplete.getPlace();
    if(!place.geometry)
    {
        // User did not select a prediction
        document.getElementById('autocomplete').placeholder='Suche für eine Addresse';
    }
    else
    {
        for(var ii in place.address_components)
        {
            for(var tt in place.address_components[ii].types)
            {
                switch(place.address_components[ii].types[tt])
                {
                    case "street_number":
                    mlocation["housenumber"]=
                    place.address_components[ii].long_name;
                    break;
                    case "route":
                    mlocation["street"]=
                    place.address_components[ii].long_name;
                    break;
                    case "postal_code":
                    mlocation["zipc"]=
                    place.address_components[ii].long_name;
                    break;
                    case "administrative_area_level_3":
                        mlocation["city"]=
                        place.address_components[ii].long_name;
                        break;
            }
            }
        }
    }
}
