import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuctionCard from "./AuctionCard"
import AuctionPrice from "./AuctionPrice";
import NavigationBar from "../NavigationBar"


export default function ItemAuction({item}){
    
    const navigate = useNavigate()
    console.log(item)


    function asd(){
        if(!item){
     
            navigate("/")
    
        }
        
    }
    useEffect(()=>asd())



        

      

    return (
        <div  >
            <NavigationBar/>
            <div className="live-auction-container">
                <AuctionCard  about={item?.aboutItem} name={item?.itemName} src={item?.imgUrl} owner={item?.owner} />
                <AuctionPrice  item={item} />   
            </div>

        </div>
    )
}