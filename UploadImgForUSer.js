import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import { storage } from '../../firebais/fiarebaisForBuyers';
import { setUser } from '../../Redux/Slicder';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "../../firebais/fiarebaisForBuyers";

const Input = styled('input')({
  display: 'none',
});


export default function UploadImgForUser() {

    const email = useSelector((state)=>state.auction.user.email)
    const ourUser = useSelector((state)=>state.auction.user)
    const dispatch = useDispatch()

    const changeImg = async(img)=> {
        const mountainsRef = ref(storage, img.name);
        const mountainImagesRef = ref(storage, `usersImgs/${img.name}`);
    
        const storageRef = ref(storage, `usersImgs/${img.name}`);
        
        uploadBytes(storageRef, img).then((snapshot) => {
        
        });
        const uploadTask = uploadBytesResumable(storageRef, img)
        
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          const response=collection(db,'BuyerUsers');
          const q =  query(response, where("email", "==", email))
          const data =  await getDocs(q);
          console.log(data.docs)
          const auctionAllItems = data.docs.map(item => {
            return{ 
                ...item.data(),
                asd:item.id
              }
          })
          let myUser = auctionAllItems[0]
          myUser.userImg = downloadURL
          setDoc(doc(db, "BuyerUsers/" + email ),myUser)
          dispatch(
            setUser({
                    userImg:downloadURL
            })
          )
        });


        
        
    }
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input onChange={(e)=>{
            changeImg(e.target.files[0])
        }} accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          Upload profile picture
        </Button>
      </label>
    </Stack>
  );
}