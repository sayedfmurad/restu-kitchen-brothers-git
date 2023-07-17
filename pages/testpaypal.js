import { useEffect } from "react"

import Autocomplete from "react-google-autocomplete";
export default ()=>{
    return <Autocomplete
    placeholder='Such für eine Addresse'
    options={{
      types: ["geocode", "establishment"],
      componentRestrictions: { country: "de" },
    }}
    apiKey="AIzaSyDmGxjz66ljEkb7bGc6zoD9iXYrZS0m_t4"
    onPlaceSelected={(place) => {
      console.log(place);
    }}
  />
}
