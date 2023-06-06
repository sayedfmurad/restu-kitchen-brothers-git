
      import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';

const GoogleMaps = () => {
  const searchBoxRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleSelect = async (address) => {
    try {
      setIsLoading(true); // Start loading
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      console.log('Latitude:', latLng.lat);
      console.log('Longitude:', latLng.lng);
      setIsLoading(false); // Stop loading
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); // Stop loading in case of error
    }
  };

  const handlePlacesChanged = () => {
    const address = searchBoxRef.current.getPlaces()[0].formatted_address;
    handleSelect(address);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDmGxjz66ljEkb7bGc6zoD9iXYrZS0m_t4" libraries={['places']}>
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <input type="text" placeholder="Enter a location" />
      </StandaloneSearchBox>
      {isLoading && ( // Render the spinner conditionally based on the loading state
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </LoadScript>
  );
};

export default GoogleMaps;
