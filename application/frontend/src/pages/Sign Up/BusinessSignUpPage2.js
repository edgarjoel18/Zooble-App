import { useState } from 'react';
import {useHistory} from 'react-router'
import React from 'react';
import styles from './SignUpPage2.module.css';

import BaseSelect from "react-select";
import FixRequiredSelect from "./FixRequiredSelect";
import makeAnimated from 'react-select/animated';

import TermsAndConditions from '../../components/Modals/TermsAndConditions'
import PrivacyPolicy from '../../components/Modals/PrivacyPolicy'




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


const typeOptions = [  // final product will fetch from database
    {value: 'Grooming', label: 'Grooming'},
    {value: 'Supplies', label: 'Supplies'},
    {value: 'Training', label: 'Training'},
    {value: 'Kennels', label: 'Kennels'},
    {value: 'Pet Stores', label: 'Pet Stores'}
];
  
const Select = props => (
    <FixRequiredSelect
      {...props}
      SelectComponent={BaseSelect}
      options={props.options || typeOptions}
    />
);

function BusinessSignUpPage2() {
    
    const [termsAndConditionsDisplay, setTermsAndConditionsDisplay] = useState(false);
    const [privacyPolicyDisplay, setPrivacyPolicyDisplay] = useState(false);

    const [email, setEmail] = useState('')
    const [uname, setUname] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [redonePassword, setRedonePassword] = useState('')

    const [failedSubmit, setFailedSubmit] = useState(false)

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

    const [selectedBusinessCategories, setSelectedBusinessCategories] = useState([]);

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');


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

    const animatedComponents = makeAnimated();

    const history= useHistory();

    function OnClickHandler(){
            history.push("/SignUpSuccess");
    }

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
                Business Details
            </div>
            <div className={styles['signup-fields-container']}>
                    <div className={styles['name-input-container']}>
                        <label className={styles['name-input-label']} for='business-name'>Business Name</label>
                        <input
                            type='text'
                            placeholder='Enter Business Name'
                            name='business-name'
                            required
                            oninvalid={()=>{console.log('')}}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles['phone-number-input-container']}>
                        <label className={styles['phone-number-input-label']} for='business-phone-number'>Phone Number</label>
                        <input
                            type='text'
                            placeholder='(000) 000-0000'
                            name='business-phone-number'
                            required
                            pattern="[0-9]*"
                            maxLength={10}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div className={styles['address-input-container']}>
                        <label className={styles['address-input-label']} for='business-address'>Business Address</label>
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
                                placeholder= "Start Typing your Business's Address"
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
                    <label className={styles['types-input-label']} for='business-categories'>Business Categories</label>
                        <Select id="shelter-animal-types" name="shelter_animal_types" className={styles['Select']}
                            onChange={setSelectedBusinessCategories}
                            options={typeOptions}
                            placeholder="Business Categories"
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

        </form>
        {/* Modals */}
        <TermsAndConditions display={termsAndConditionsDisplay} onClose={closeTermsAndConditionsModal} />
        <PrivacyPolicy display={privacyPolicyDisplay} onClose={closePrivacyPolicyModal} />
        </>
    );
}

export default BusinessSignUpPage2;