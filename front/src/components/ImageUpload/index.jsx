import axios from 'axios'
import React, {useState} from 'react'

import styles from "./styles"

function ImageUpload({ setImage }) {
    // const [image, setImage] = useState('')
    // const [isUploaded, setIsUploaded] = useState(false)

    const classes = styles()

    function handleImage (e) {
        setImage(e.target.files[0])
    }

    function handleApi () {
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
            {/* {isUploaded
                ? <img className={classes.uploadedImg} src= {`./asset/images/${image}`} />
                : <div className={classes.imgPlaceholder}></div>
            } */}
            {/* <button>بارگذاری تصویر</button> */}
        </div>
    )
}

export default ImageUpload