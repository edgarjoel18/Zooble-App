import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

import axios from 'axios'

const apiGatewayURL = 'https://5gdyytvwb5.execute-api.us-west-2.amazonaws.com/default/getPresignedURL'

function UploadImage() {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        axios.get(apiGatewayURL)  //first get the presigned s3 url
        .then((response) =>{
            console.log(response)
            console.log(response.data)
            axios.put(response.data.uploadURL, acceptedFiles[0]).then((response) =>{
                console.log(response);
            })
            .catch((err) =>{
                console.log(err);
            })
        })
        .catch((err) =>{
            console.log(err);
        })
      }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
            isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default UploadImage
