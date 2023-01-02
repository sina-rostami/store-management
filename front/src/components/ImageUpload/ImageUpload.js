import React from 'react'

function ImageUpload() {

    const [image, setImage] = useState('')
    function handleImage (e){
        console.log(e.target.files)
        setImage(e.target.files[0])
    }

    return(
        <div>
            <input type="file" name='file' />
            <button>Upload</button>
        </div>
    )
}

export default ImageUpload