import axios from 'axios'
import React, {useState} from 'react'

import styles from "./styles"

function ImageUpload({ setImage }) {
    const classes = styles()

    function handleImage (e) {
        setImage(e.target.files[0])
    }

    return(
        <div className={classes.container} >
            <input onChange={handleImage} className={classes.imgInput} accept='image/*' type="file" name='file' />
            <br />
        </div>
    )
}

export default ImageUpload