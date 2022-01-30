import React, { useState } from "react";
import { getDownloadURL, getMetadata, getStorage, ref, uploadBytes, uploadBytesResumable, } from "firebase/storage";
import UploadButton from "./UploadeButton";





function UpoadImg({setItem,item}){
    const[img,setImg] = useState("")
    const storage = getStorage();
    const[url,setUrl] = useState()

 const addImg = (img) => {
    const mountainsRef = ref(storage, img.name);
    const mountainImagesRef = ref(storage, `images/${img.name}`);

    const storageRef = ref(storage, `images/${img.name}`);
    
    uploadBytes(storageRef, img).then((snapshot) => {
    });
    const uploadTask = uploadBytesResumable(storageRef, img)
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log(downloadURL)
      setUrl(downloadURL)
      setItem({
          ...item,
          imgUrl:downloadURL
      })      
    });
 }



    return(
        <div style={{
            display:"flex"
        }}>

            <UploadButton addImg={addImg} />

            <img src={url} height="300px" width="300px"></img>
        </div>
    )
}

export default UpoadImg