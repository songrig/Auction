import "./App.css"
import Auction from "./Components/Auction"
import React from "react"
import { Provider } from "react-redux"
import { store } from "./Redux/Store"

function App() {
  return (
    <div>
      <Provider store={store}>
        <Auction />
      </Provider>

    </div>
  )
}

export default App
