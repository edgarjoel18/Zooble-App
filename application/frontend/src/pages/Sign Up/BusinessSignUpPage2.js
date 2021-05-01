import { useState, useEffect } from 'react';
import {useHistory} from 'react-router'
import {useLocation} from "react-router-dom";
import Axios from 'axios';
import styles from './SignUpPage2.module.css';

import BaseSelect from "react-select";
import FixRequiredSelect from "./FixRequiredSelect";
import makeAnimated from 'react-select/animated';

//Import Modals
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

const typeOptions = []; //for storing business type options

const Select = props => (
    <FixRequiredSelect
      {...props}
      SelectComponent={BaseSelect}
      options={props.options || typeOptions}
    />
);

function BusinessSignUpPage2(props) {
    
    const location = useLocation();
    let state = props.location.state;
    console.log(state);
    
    const [termsAndConditionsDisplay, setTermsAndConditionsDisplay] = useState(false);
    const [privacyPolicyDisplay, setPrivacyPolicyDisplay] = useState(false);

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

    const [selectedBusinessType, setSelectedBusinessType] = useState();

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();


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

    function signUpBusiness(event){
        event.preventDefault();
        console.log('Email: ', state.email)
        console.log('FirstName: ', state.firstName)
        console.log('LastName: ', state.lastName)
        console.log('Username: ', state.username)
        console.log('Password: ', state.password)
        console.log('RedonePassword: ', state.redonePassword)
        console.log('Shelter Name: ', name)
        console.log('Shelter Phone Number: ', phoneNumber)
        console.log('Address: ', address)
        console.log('Latitude: ', latitude)
        console.log('Longitude: ', longitude)
        console.log('Business Type: ', selectedBusinessType.value)
        Axios.post('/api/sign-up/business', { 
            email: state.email,
            firstName: state.firstName,
            lastName: state.lastName,
            uname: state.username,
            password: state.password,
            redonePassword: state.redonePassword,
            businessName: name,
            phoneNumber: phoneNumber,
            address: address,
            latitude: latitude,
            longitude: longitude,
            type: selectedBusinessType.value
        },{withCredentials:true}).then(response => {
            console.log(response);
            console.log(response.data);
            // if(response.data.affectedRows === 1){
                history.push("/SignUpSuccess");
            // }

        }).catch(error => {
            console.log("Error");
            // if (error.response.data === "exists"){
            //     // setError("An Account using that Email or Username already exists");
            //     console.log(error);
            // }
            // else if (error.response.data === "passwords not matching"){
            //     // setError("The Passwords Entered Do Not Match");
            //     console.log(error);
            // }
            // else if (error.response.data === "password requirements"){
            //     // setError("Your Password Must Have: 8-50 Characters and Contain: 1 Capital Letter, 1 Number, 1 Special Character");
            //     console.log(error);
            // }
            console.log(error);
        })
    }

    useEffect(() => {  //run once when page loads/refresh
        Axios.get('/api/business-types')   //get business types from database
        .then(response =>{
            console.log(response);
            console.log(response.data)
            console.log(response.data[0]);
            for(let i= 0 ; i < response.data.length; i++){
                typeOptions.push({value: response.data[i].business_type_id, label: response.data[i].business_type_name});
            }
            console.log(typeOptions);
        })
    }, [])

    return (
        <>
        <form className={styles['signup-container']} onSubmit={signUpBusiness}>
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
                                setLatitude(lat);
                                setLongitude(lng);
                            } catch(error){
                                console.log("error!")
                            }
                                console.log(address)
                                setAddress(address);
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
                        <Select id="business-type" name="business_type" className={styles['Select']}
                            onChange={setSelectedBusinessType}
                            options={typeOptions}
                            placeholder="Business Type"
                            theme={customTheme}
                            styles={customStyles}
                            isSearchable
                            // isMulti
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