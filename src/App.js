import React, { useState } from "react";
import MapComponent from "./map/map";
import Weather from "./components/Weather/Weather";

function App(){
  const [data, setData] = useState({name:'Name'})
  const [getLoc, setGetLoc]  = useState(false)

  async function updateData(data){
    let main_info = await data
    setData({main_info})
  }

  function updateGetLoc(){
    setGetLoc(true)
  }

  function resetGetLoc(){
    setGetLoc(false)
  }

  return(
    <div className="app">
      <MapComponent updateData={updateData} getLoc={getLoc} resetGetLoc={resetGetLoc}/>
      <Weather data={data} setGetLoc={updateGetLoc}/>
    </div>
  )
}

export default App