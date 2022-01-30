import { configureStore } from "@reduxjs/toolkit";
import auctionRedused from "./Slicder"

export const store = configureStore({
  reducer: {
    auction:auctionRedused
  },
})