import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import React, { useCallback, useEffect, useState }  from "react";
import { db } from "../../firebais/fiarebaisForBuyers";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import SignInOrSignUp from "./IsAuthForAuction";



  function AuctionPrice({item}){
     
    const navigate = useNavigate()
    let [ourItem,setOurItem] = useState()
    const email = useSelector((state) => state.auction.user.email)
    const isAuth = useSelector((state) => state.auction.user.isAuth)
    const [signUp,setSignUP] = useState()

    if(!item){
      navigate("/")
    }
    const setItem = async () =>{
      const response=collection(db,'BuyerUsers');
      console.log()
      const q =  query(response, where("email", "==", ourItem?.liveOwner))
      const data =  await getDocs(q);
      console.log(data.docs)
      const auctionAllItems = data.docs.map(item => {
        return{ 
            ...item.data(),
            asd:item.id
          }
      })
      let myUser = auctionAllItems[0]
      myUser.myBougthItems.push(ourItem)
      setDoc(doc(db, "BuyerUsers/" + ourItem.liveOwner ),myUser)
      navigate("/")
    }
    if(new Date (item?.date.toDate().getTime() + 600000) <= new Date()){
      setItem()
      
      
    }

    let live = (item)=> (new Date()-item?.date.toDate() >= 0 && new Date()-item?.date.toDate() <= 600000)

     const fetchBlogs = useCallback(async function fetchBlogs(db){
        const response=collection(db,'AuctionItems');
        const q = query(response, where("uid", "==", item?.uid))
        const data = await getDocs(q);
        const auctionAllItems = data.docs.map(item => {
          return{ 
              ...item.data(),
              asd:item.id
            }
        })

        setOurItem(auctionAllItems[0])
        
      },[])
    
    
      
      useEffect(()=>fetchBlogs(db),[])
      useEffect(()=>{
       const int = setInterval(()=>fetchBlogs(db),3000)
       return ()=> clearInterval(int)
      },[fetchBlogs])

      async function addPrice(){
        console.log(isAuth)
            if(isAuth){
              ourItem.itemPrice = Number(ourItem.itemPrice)  + 100
              ourItem.liveOwner = email
              await setDoc(doc(db, "AuctionItems/" + ourItem.asd ),ourItem)
            }else{
              setSignUP(true)
              console.log(444)
              
            }



          
      }

    return(
        <div className="live-auction-price">
          {signUp&&<SignInOrSignUp setSignUP={setSignUP} />}  
          {live(ourItem) && <>
            <span>{ourItem?.itemPrice}</span>
            <Button variant="contained" onClick={addPrice} className="add-btn">+ 100</Button>
            </>}
            {
              !live(ourItem) && <>
                <h3>Coming soon...</h3>
              </>
            }
            
        </div>
    )

}

export default AuctionPrice