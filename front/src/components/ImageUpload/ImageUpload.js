import axios from 'axios'
import React from 'react'

function ImageUpload() {

    const [image, setImage] = useState('')
    function handleImage (e){
        console.log(e.target.files)
        setImage(e.target.files[0])
    }
    function handleApi() {
        const formData = new FormData()
        formData.append('image', image)
        axios.post('url', formData).then((res) => { // url is the destination
            console.log(res)
        })
    }
    return(
        <div>
            <input type="file" name='file' />
            <button>Upload</button>
        </div>
    )
}

export default ImageUpload