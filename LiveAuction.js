import React from "react"
import NavigationBar from "../NavigationBar"

import { useSelector } from "react-redux"
import LiveCardImg from "./LiveCardImg"


function Home({setItem}) {
  const liveDrow = useSelector((state)=> state.auction.liveDrow)
  
  return (
    <div>
      <NavigationBar />
      {
          <LiveCardImg setItem={setItem}  />
        }
    </div>
  )
}

export default Home
