import axios from 'axios'
import React, {useState} from 'react'

import styles from "./styles.js"

function ImageUpload() {

    const [image, setImage] = useState('')

    const classes = styles()

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
        <div className={classes.container} >
            <input onChange={handleImage} className={classes.imgInput} accept='image/*' type="file" name='file' />
            <br />
            {image && <img src= {`./asset/images/${image}`} />}
            <button>بارگذاری تصویر</button>
        </div>
    )
}

export default ImageUpload