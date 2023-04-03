let autocomplete;
    function initAutocomplete(){
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete'),
            {
                componentRestrictions:{'country':['DE']},
                fields:['geometry','place_id','address_components',]
            }
        );
        autocomplete.addListener('place_changed',onPlaceChanged)

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
