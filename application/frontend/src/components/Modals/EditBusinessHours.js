import {useState} from 'react'

import Select from 'react-select'

import Modal from './Modal'

import styles from './EditBusinessHours.module.css'

function EditBusinessHours({display,onClose}){

    const [sundayStart, setSundayStart] = useState();
    const [mondayStart, setMondayStart] = useState();
    const [tuesdayStart, setTuesdayStart] = useState();
    const [wednesdayStart, setWednesdayStart] = useState();
    const [thursdayStart, setThursdayStart] = useState();
    const [fridayStart, setFridayStart] = useState();
    const [saturdayStart, setSaturdayStart] = useState();

    const [sundayEnd, setSundayEnd] = useState();
    const [mondayEnd, setMondayEnd] = useState();
    const [tuesdayEnd, setTuesdayEnd] = useState();
    const [wednesdayEnd, setWednesdayEnd] = useState();
    const [thursdayEnd, setThursdayEnd] = useState();
    const [fridayEnd, setFridayEnd] = useState();
    const [saturdayEnd, setSaturdayEnd] = useState();

    const hourOptions = [
        {value: '01:00:00', label:'1:00 AM'},
        {value: '02:00:00', label:'2:00 AM'},
        {value: '03:00:00', label:'3:00 AM'},
        {value: '04:00:00', label:'4:00 AM'},
        {value: '05:00:00', label:'5:00 AM'},
        {value: '06:00:00', label:'6:00 AM'},
        {value: '07:00:00', label:'7:00 AM'},
        {value: '08:00:00', label:'8:00 AM'},
        {value: '09:00:00', label:'9:00 AM'},
        {value: '10:00:00', label:'10:00 AM'},
        {value: '11:00:00', label:'11:00 AM'},
        {value: '12:00:00', label:'12:00 PM'},
        {value: '13:00:00', label:'1:00 PM'},
        {value: '14:00:00', label:'2:00 PM'},
        {value: '15:00:00', label:'3:00 PM'},
        {value: '16:00:00', label:'4:00 PM'},
        {value: '17:00:00', label:'5:00 PM'},
        {value: '18:00:00', label:'6:00 PM'},
        {value: '19:00:00', label:'7:00 PM'},
        {value: '20:00:00', label:'8:00 PM'},
        {value: '21:00:00', label:'9:00 PM'},
        {value: '22:00:00', label:'10:00 PM'},
        {value: '23:00:00', label:'11:00 PM'},
        {value: '24:00:00', label:'12:00 AM'}
    ];

    console.log(hourOptions)

    function customTheme(theme){
        return {
            ... theme,
            colors:{
                ... theme.colors,
                primary25: '#B3B3B3',
                primary:'#1CB48F',
            }
        }
    }

    function submitHoursEdit(){
        console.log('updatedHour is ' + JSON.stringify(sundayStart))
        // axios.post("/api/hours",{
        //     newHours: hours
        // })
        // .then(response =>{
        //     console.log(response);
        // })
        // .catch(err =>{
        //     console.log(err);
        // })
    }

    return (
        <Modal display={display} onClose={onClose}>
            <div className={styles['edit-business-hours-header']}>
                Edit Business Hours
            </div>
            <div className={styles['edit-business-hours-container']}>
                <div className={styles['edit-sunday-hours-start']}>
                    <label for="sunday-start">Sunday Opening</label>
                    <Select id="sunday-start" name="sunday_start"
                            onChange={setSundayStart}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Opening Hours"
                            isSearchable
                    />
                </div>
                <div className={styles['edit-sunday-hours-end']}>
                    <label for="sunday-end">Sunday Closing</label>
                        <Select id="sunday-end" name="sunday_end"
                            onChange={setSundayEnd}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Closing Hours"
                            isSearchable
                        />
                </div>
                <div className={styles['edit-monday-hours-start']}>
                    <label for="monday-start">Monday Opening</label>
                        <Select id="monday-start" name="monday_start"
                            onChange={setMondayStart}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Opening Hours"
                            isSearchable
                        />
                </div>
                <div className={styles['edit-monday-hours-end']}>
                    <label for="monday-end">Monday Closing</label>
                        <Select id="monday-end" name="monday_end"
                            onChange={setMondayEnd}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Closing Hours"
                            isSearchable
                        />
                </div>
                <div className={styles['edit-tuesday-hours-start']}>
                    <label for="tuesday-start">Tuesday Opening</label>
                        <Select id="tuesday-start" name="tuesday_start"
                            onChange={setTuesdayStart}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Closing Hours"
                            isSearchable
                        />
                </div>
                <div className={styles['edit-tuesday-hours-end']}>
                    <label for="tuesday-end">Tuesday Closing</label>
                        <Select id="tuesday-end" name="tuesday_end"
                            onChange={setTuesdayEnd}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Closing Hours"
                            isSearchable
                        />
                </div>
                <div className={styles['edit-wednesday-hours-start']}>
                <label for="wednesday-start">Wednesday Start</label>
                        <Select id="wednesday-start" name="wednesday_start"
                            onChange={setWednesdayStart}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Opening Hours"
                            isSearchable
                        />
                </div>
                <div className={styles['edit-wednesday-hours-end']}>
                    <label for="wednesday-end">Wednesday Closing</label>
                        <Select id="wednesday-end" name="wednesday_end"
                            onChange={setWednesdayEnd}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Closing Hours"
                            isSearchable
                        />
                </div>
                <div className={styles['edit-thursday-hours-start']}>
                    <label for="thursday-start">Thursday Start</label>
                        <Select id="thursday-start" name="thursday_start"
                            onChange={setThursdayStart}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Opening Hours"
                            isSearchable
                        />
                </div>
                <div className={styles['edit-thursday-hours-end']}>
                    <label for="thursday-end">Thursday End</label>
                        <Select id="thursday-end" name="thursday_end"
                            onChange={setThursdayEnd}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Closing Hours"
                            isSearchable
                        />
                </div>
                <div className={styles['edit-friday-hours-start']}>
                    <label for="friday-start">Friday Start</label>
                        <Select id="friday-start" name="friday_start"
                            onChange={setFridayStart}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Opening Hours"
                            isSearchable
                        />
                </div>
                <div className={styles['edit-friday-hours-end']}>
                    <label for="friday-end">Friday End</label>
                        <Select id="friday-end" name="friday_end"
                            onChange={setFridayEnd}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Closing Hours"
                            isSearchable
                        />
                </div>
                <div className={styles['edit-saturday-hours-start']}>
                    <label for="saturday-start">Saturday Start</label>
                        <Select id="saturday-start" name="saturday_start"
                            onChange={setSaturdayStart}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Opening Hours"
                            isSearchable
                            maxMenuHeight= {45}
                        />
                </div>
                <div className={styles['edit-saturday-hours-end']}>
                    <label for="saturday-end">Saturday End</label>
                        <Select id="saturday-end" name="saturday_end"
                            onChange={setSaturdayEnd}
                            options={hourOptions}
                            theme={customTheme}
                            placeholder="Type in Closing Hours"
                            isSearchable
                            maxMenuHeight= {45}
                        />
                </div>
                <button className={styles['edit-business-hours-submit']} onClick={() => {
                    onClose();
                    submitHoursEdit();
                }}>Submit</button>
            </div>
        </Modal>
    )
}

export default EditBusinessHours
