import React from "react"
import Lolly from './../component/Lolly';
import './../styles/main.css'
import Header from './../component/Header';
import { navigate } from "gatsby";

export default function Home() {
  return <div className="container" >
    <Header/>
  <div className="listLollies">
  <div>
      
      <Lolly fillLollyTop="#e95946" fillLollyMiddle="#d52358" fillLollyBottom="#deaa43"/>
      </div>
      <div>
      <Lolly fillLollyTop="red" fillLollyMiddle="orange" fillLollyBottom="blue"/>
  </div>
    
    </div>
    <input type="button" value="Create New Lolly"
    onClick={()=>{
      navigate("/createNew")
    }}></input>
  </div>
}
