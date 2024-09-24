'use client'

import classes from './image-picker.module.css'
import { useRef, useState } from 'react'
import Image from 'next/image'

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState(); 
    // create ref of input element 
    const imageInput = useRef();

    function handlePickClick() {
        // simulate clicking on input element 
        imageInput.current.click();
    }

    function handleImageChange(event) {
        // file that input element possesses
        const file = event.target.files[0];
        if (!file) {
            setPickedImage(null);
            return; 
        }
        // FileReader read contents of files 
        const fileReader = new FileReader();
        // read the file content as data URL(temp local url)
        fileReader.readAsDataURL(file);
        // the function is triggered once 'readAsDataURL' is done 
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };
    }

    return <div className={classes.picker}>
        <label htmlFor={name} >{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image picked yet.</p>}
                {pickedImage && <Image src={pickedImage} alt="The image selected by the user" fill />}
            </div>
            <input
            className={classes.input} 
            type="file" 
            id={name}  
            accept="image/png, image/jpeg" 
            name={name}
            ref={imageInput}
            onChange={handleImageChange}
            required />
            <button 
            className={classes.button} 
            type="button" 
            onClick={handlePickClick}>
                Pick an Image
            </button>
        </div>
    </div>
}