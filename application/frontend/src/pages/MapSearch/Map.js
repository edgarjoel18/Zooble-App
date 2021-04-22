import React from 'react'

import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';

import {formatRelative} from "date-fns";

import styles from './Map.module.css'

import usePlacesAutocomplete,{
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox";

const libraries = ["places"]
const mapContainerStyle = {
    width: '50vw',
    height: 'calc(100vh - 100px)',
};

const options = {
    disableDefaultUI: true,
}





function Map() {

    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((event)=>{
        setMarkers(current => [
            ...current, 
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    const mapRef = React.useRef(); //retain state without causing re-renders
    const onMapLoad = React.useCallback((map) =>{
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({lat,lng}) =>{
        mapRef.current.panTo({lat,lng});
        mapRef.current.setZoom(14);
    },[]);

    const center = {
        lat: 37.773972,
        lng:   -122.431297,
    };

    const  {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: `AIzaSyDGz7t7D1PRi8X2Or-SHAie2OgWoFH--Bs`,
        libraries,
   });

   if (loadError) return "Error";
   if (!isLoaded) return "Loading...";
   
    
    return (
        <div>
            <Search panTo={panTo}/>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >

                {markers.map(marker => 
                    <Marker 
                        key={marker.time.toISOString()} 
                        position={{lat:marker.lat,lng:marker.lng}} 
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                    )}

                    {selected ? (
                        <InfoWindow 
                            position={{ lat: selected.lat, lng: selected.lng}} 
                            onCloseClick={()=>{
                                setSelected(null);
                            }}
                        >
                            <div>
                                <h2>Bear Spotted!</h2>
                                <p>Spotted {formatRelative(selected.time, new Date())}</p>
                            </div>
                        </InfoWindow>): null}
            </GoogleMap>
        </div>
    )
}

function Search({panTo}){
    const {
        ready, 
        value, 
        suggestions: {status, data}, 
        setValue, 
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions:{
            location: {lat: () => 37.773972,lng: () => -122.431297},
            radius: 200 * 1000,
        },
    });

    return(
        <div className={styles["search"]}>
        <Combobox 
            onSelect={async (address)=>{
                setValue(address,false);
                clearSuggestions();

                try{
                    const results = await getGeocode({address});
                    const{lat,lng} = await getLatLng(results[0]);
                    console.log(lat,lng);
                    panTo({lat, lng});
                } catch(error){
                    console.log("error!")
                }

                console.log(address)
            }}
        >
        <ComboboxInput value={value} 
            onChange={(e)=> {
                setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder="Enter an address"
        />
        <ComboboxPopover>
            {status === "OK" && data.map(({id,description}) => 
                <ComboboxOption key={id} value={description}/>
            )}
        </ComboboxPopover>
    </Combobox>
    </div>)
}

export default Map
