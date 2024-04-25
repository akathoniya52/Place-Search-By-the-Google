import React, { useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
} from "react-google-places-autocomplete";

interface MyProps {
  addLocation: (address: string, latitude: number, longitude: number) => void;
}

const GooglePlaceSearch: React.FC<MyProps> = ({ addLocation }) => {
  const [value, setValue] = useState<any>(null);

  const handleChange = async (address: any) => {
    setValue(address);
    const result = await geocodeByAddress(address.label);
    // console.log("Result---->",result[0].geometry.location.lng());
    addLocation(
      result[0].formatted_address,
      result[0].geometry.location.lat(),
      result[0].geometry.location.lng()
    );
  };

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey="your-api-key"
        selectProps={{
          value: value,
          onChange: handleChange,
          placeholder: "Enter your location...",
          styles: {
            option: (provided) => ({
              ...provided,
              color: "black",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "blue",
            }),
          },
        }}
        debounce={1000}
        onLoadFailed={(error) =>
          console.error("Could not inject Google script", error)
        }
      />
    </div>
  );
};

export default GooglePlaceSearch;

// first install the npm package react-google-places-autocomplete
// then paste your google key and modified the component as  per the need
// you can take the reference from here https://tintef.github.io/react-google-places-autocomplete/docs/
