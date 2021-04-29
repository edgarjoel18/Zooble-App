import { useState } from 'react';
import styles from './SignUpPage2.module.css';

import BaseSelect from "react-select";
import FixRequiredSelect from "./FixRequiredSelect";
import makeAnimated from 'react-select/animated';

import TermsAndConditions from '../../components/Modals/TermsAndConditions'
import PrivacyPolicy from '../../components/Modals/PrivacyPolicy'
import { useHistory } from 'react-router';

//For address input and suggestions
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox";

  import usePlacesAutocomplete,{
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";

  const typeOptions = [   //Real version will fetch from database
    { value: 'Dog', label: 'Dog' },
    { value: 'Cat', label: 'Cat' },
    { value: 'Lizard', label: 'Lizard' },
    { value: 'Monkey', label: 'Monkey' },
];

  const Select = props => (
    <FixRequiredSelect
      {...props}
      SelectComponent={BaseSelect}
      options={props.options || typeOptions}
    />
);


function ShelterSignUpPage2() {
    const typeOptions = [   //Real version will fetch from database
        { value: 'Dog', label: 'Dog' },
        { value: 'Cat', label: 'Cat' },
        { value: 'Lizard', label: 'Lizard' },
        { value: 'Monkey', label: 'Monkey' },
    ];

    const [termsAndConditionsDisplay, setTermsAndConditionsDisplay] = useState(false);
    const [privacyPolicyDisplay, setPrivacyPolicyDisplay] = useState(false);

    function openTermsAndConditionsModal() {
        setTermsAndConditionsDisplay(true);
    }

    function closeTermsAndConditionsModal() {
        setTermsAndConditionsDisplay(false);
    }

    function openPrivacyPolicyModal() {
        setPrivacyPolicyDisplay(true);
    }

    function closePrivacyPolicyModal() {
        setPrivacyPolicyDisplay(false);
    }

    const [selectedPetTypes, setSelectedPetTypes] = useState([]);

    function customTheme(theme) { //move this a separate file and import maybe?
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: '#B3B3B3',
                primary: '#1CB48F',
            }
        }
    }


    const customStyles = {
        control: (base, state) => ({
          ...base,
          height: '54.5px',
          'min-height': '54.5px',
          'border-radius': '7.5px',
        }),
    };

    const history= useHistory();

    function OnClickHandler(){
        history.push("/SignUpSuccess");
    }

    document.querySelector( "input" ).addEventListener( "invalid",
    function( event ) {
        event.preventDefault();
    });

    const animatedComponents = makeAnimated();

    //State variables for inputs
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    //Use Places Autocomplete call
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

    return (
        <>
        <form className={styles['signup-container']} onSubmit={OnClickHandler}>
            <div className={styles['signup-container-header']}>
                Shelter Details
            </div>
            <div className={styles['signup-fields-container']}>
                <div className={styles['name-input-container']}>
                    <label className={styles['name-input-label']} for='shelter-name'>Shelter Name</label>
                    <input
                        type='text'
                        placeholder='Enter Shelter Name'
                        name='shelter-name'
                        required
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className={styles['phone-number-input-container']}>
                    <label className={styles['phone-number-input-label']} for='shelter-phone-number'>Phone Number</label>
                    <input
                        type='text'
                        placeholder='(000) 000-0000'
                        name='shelter-phone-number'
                        pattern="[0-9]*"
                        maxLength={10}
                        required
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div className={styles['address-input-container']}>
                <label className={styles['address-input-label']} for='shelter-address'>Address</label>
                <Combobox 
                    onSelect={async (address)=>{
                    setValue(address,false);
                    clearSuggestions();
                    try{
                        const results = await getGeocode({address});
                        const{lat,lng} = await getLatLng(results[0]);
                        console.log(lat,lng);
                    } catch(error){
                        console.log("error!")
                    }
                        console.log(address)
                    }}
                >
                    <ComboboxInput 
                        value={value}
                        placeholder= "Start Typing your Shelter's Address"
                        onChange={(e)=> {
                            setValue(e.target.value);
                            //record lat lng to store in database
                        }}
                        required
                        disabled={!ready}
                    />
                    <ComboboxPopover>
                        <ComboboxList className={styles['combobox-list']}>
                            {status === "OK" && data.map(({id,description}) => 
                            <ComboboxOption key={id} value={description}/>

                        )}
                         </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
                </div>

                <div className={styles['types-input-container']}>
                    <label className={styles['types-input-label']} for='shelter-animal-types'>Types of Animals</label>
                    <Select id="shelter-animal-types" name="shelter_animal_types"
                        onChange={setSelectedPetTypes}
                        options={typeOptions}
                        placeholder="Animal Types"
                        theme={customTheme}
                        styles={customStyles}
                        isSearchable
                        isMulti
                        components={animatedComponents}
                        required
                    />
                </div>


            </div>

            <div className={styles['checkbox-container']}>
                <p>By creating an account you agree to our <button className={styles['terms-button']} onClick={openTermsAndConditionsModal}>Terms</button> &<button className={styles['policy-button']} onClick={openPrivacyPolicyModal}>Privacy Policy</button>
                    <label>
                        <input
                            type='checkbox'
                            required name='remember'
                        />
                    </label>
                </p>
            </div>

            <div className={styles['btn-container']}>
                <button type='submit' className={styles['submit-btn']}>Sign Up</button>
            </div>
            {/* Modals */}

        </form>
        <TermsAndConditions display={termsAndConditionsDisplay} onClose={closeTermsAndConditionsModal} />
        <PrivacyPolicy display={privacyPolicyDisplay} onClose={closePrivacyPolicyModal} />
        </>
    );
}

export default ShelterSignUpPage2;