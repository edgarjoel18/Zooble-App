import {useCallback, useState} from 'react'
import Dropzone from 'react-dropzone'

import axios from 'axios'

import styles from './UploadImage.module.css'

const apiGatewayURL = 'https://5gdyytvwb5.execute-api.us-west-2.amazonaws.com/default/getPresignedURL'

function UploadImage() {
    

    const [image, setImage] = useState('https://csc648groupproject.s3-us-west-2.amazonaws.com/DefaultProfilePic.svg');

    const onDrop = (acceptedFiles) => {
        let config = {
            headers: {
                'Content-type': 'image/jpeg'
            }
        }
        // Do something with the files
        axios.get(apiGatewayURL)  //first get the presigned s3 url
        .then((response) =>{
            console.log(response)
            console.log(response.data)
            let presignedFileURL = response.data.photoFilename;
            console.log(acceptedFiles[0]);
            axios.put(response.data.uploadURL, acceptedFiles[0],config).then((response) =>{
                console.log(response);
                console.log(response.data);
                setImage('https://csc648groupproject.s3-us-west-2.amazonaws.com/' + presignedFileURL);
            })
            .catch((err) =>{
                console.log(err);
                if(err.response.status == 403){
                    //display error message to user
                }
            })
        })
        .catch((err) =>{
            console.log(err);
        })
      }


    return (
        <>
                <Dropzone  onDrop={onDrop} accept="image/jpeg"  multiple={false} maxSize={5242880}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div className={styles['dropzone']} {...getRootProps()}>
                                <input  {...getInputProps()} />
                                {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
                            </div>
                        </section>
                    )}
                </Dropzone>
            {/* <img src={image}/> */}
        </>
    )
}

export default UploadImage
