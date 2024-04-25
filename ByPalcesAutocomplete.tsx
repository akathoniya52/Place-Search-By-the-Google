import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  // getLatLng,
} from "react-places-autocomplete";


interface MyProps {
  addLocation:(address:string,latitude:number,longitude:number)=>void
}

const App:React.FC<MyProps> = ({addLocation}) => {
  const [address, setAddress] = useState("");

  const handleChange = (address: any) => {
    setAddress(address);
    console.log(address);
  };

  const handleSelect = async (address: any) => {
    const result = await geocodeByAddress(address);
    addLocation(address,result[0].geometry.location.lat(),result[0].geometry.location.lng())
    console.log(result);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      debounce={1000}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="text-black">
          <input
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "location-search-input w-full h-10 outline-none rounded-lg px-2",
            })}
          />
          <div className="autocomplete-dropdown-container overflow-y-auto rounded-lg max-h-[15vh]">
            {loading && <div className="w-full bg-white">Loading...</div>}
            {suggestions.map((suggestion,index) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  key={index}
                  className="px-2"
                >
                  <span
                    style={{ color: "black" }}
                    onClick={() => handleChange(suggestion.description)}
                  >
                    {suggestion.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default App;
