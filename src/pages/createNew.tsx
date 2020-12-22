import React, { useState } from "react"
import Header from './../component/Header'
import Lolly from "./../component/Lolly"
import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import shortid from "shortid"
import { navigate } from "gatsby"

const createLollyMutation = gql`
  mutation createLolly(
    $recipientName: String!
    $sendersName: String!
    $message: String!
    $flavorTop: String!
    $flavorMid: String!
    $flavorBot: String!
    $lollyPath: String!
  ) {
    createLolly(
      recipientName: $recipientName
      sendersName: $sendersName
      message: $message
      flavorTop: $flavorTop
      flavorMid: $flavorMid
      flavorBot: $flavorBot
      lollyPath: $lollyPath
    ) {
      message
      lollyPath
    }
  }
`

export default function CreateNew() {
  const [createLolly] = useMutation(createLollyMutation)

  const [flavourTop, setFlavourTop] = useState("#ef0078")
  const [flavourMiddle, setFlavourMiddle] = useState("#ff8d00")
  const [flavourEnd, setFlavourEnd] = useState("#dd0074")
  const [recipentName, setRecipentName] = useState("")
  const [message, setMessage] = useState("")
  const [senderName, setSenderName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const id = shortid.generate()
    const result = await createLolly({
      variables: {
        recipientName: recipentName,
        sendersName: senderName,
        message: message,
        flavorTop: flavourTop,
        flavorMid: flavourMiddle,
        flavorBot: flavourEnd,
        lollyPath: id,
      },
    })
    setLoading(false)
    navigate(`/lollies/${id}`)
  }

  return (
    <div className="container">
      <Header />
      
      <div className="lollyContainer">
        <div>
          <Lolly
            fillLollyBottom={flavourEnd}
            fillLollyMiddle={flavourMiddle}
            fillLollyTop={flavourTop}
          />
        </div>
        <div className="colorContainer">
          <label>
            <input
              type="color"
              name="top"
              value={flavourTop}
              onChange={e => setFlavourTop(e.target.value)}
            />
          </label>
          <label>
            <input
              type="color"
              name="middle"
              value={flavourMiddle}
              onChange={e => setFlavourMiddle(e.target.value)}
            />
          </label>
          <label>
            <input
              type="color"
              name="bottom"
              value={flavourEnd}
              onChange={e => setFlavourEnd(e.target.value)}
            />
          </label>
        </div>
        <div className="formContainer">
          <label>To</label>
          <input
            type="text"
            required
            onChange={e => setRecipentName(e.target.value)}
          />
          <label>Message</label>
          <textarea
            style={{ resize: "none" }}
            rows={7}
            required
            onChange={e => setMessage(e.target.value)}
          />
          <label>From</label>
          <input
            type="text"
            required
            onChange={e => setSenderName(e.target.value)}
          />
          <div className="formBtn-wrapper">
            <button onClick={()=>{
      navigate("/NewPage")
    }}>
              {loading ? "freeze..." : "freeze"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}




// import { gql, useMutation, useQuery } from "@apollo/client";
// import React, { useRef, useState } from "react"
// import Header from "../component/Header"
// import Lolly from "../component/Lolly"

// const GETDATA = gql`
//     {
//         hello
//     }
// `

// const createLollyMutation = gql`
//     mutation createLolly($recipientName: String!, $message: String!, $senderName: String!, $flavourTop: String!, $flavourMiddle: String!,$flavourBottom: String!) {
//         createLolly(recipientName: $recipientName, message: $message, senderName: $senderName, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle,flavourBottom: $flavourBottom) {
//             message
//             lollyPath
//         }
//     }
// `

// export default function CreateNew() {
//     const [color1, setColor1] = useState("#d52358");
//     const [color2, setColor2] = useState("#e95946");
//     const [color3, setColor3] = useState("#deaa43");
//     const recipientNameRef = useRef();
//     const messageRef = useRef();
//     const senderRef = useRef();

//     //const {loading, error, data } = useQuery(GETDATA);
//     const [createLolly] = useMutation(createLollyMutation);

//     const submitLollyForm = async () => {
//         console.log("clicked");
//         console.log("color 1", color1);
//         console.log("sender", senderRef.current.value);
//         const result = await createLolly({
//             variables : {
//                 recipientName: recipientNameRef.current.value,
//                 message : messageRef.current.value,
//                 senderName: senderRef.current.value,
//                 flavourTop: color1,
//                 flavourMiddle: color2,
//                 flavourBottom: color3
//             }
//         });
//         console.log("result form server = ",result);
//     }

//   return (
//     <div className="container">
//       {/*data && data.hello && <div>{data.hello}</div>*/}
//       <Header />

//         <div className="lollyFormDiv">
//             <div>
//                 <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3} />
//             </div>
//             <div className="lollyFlavourDiv">
//                 <label htmlFor="flavourTop" className="colorPickerLabel">
//                     <input type="color"  value={color1} className="colorPicker" name="flavourTop" id="flavourTop"
//                         onChange={(e)=>{
//                             setColor1(e.target.value)
//                         }}
                    
//                     />
//                 </label>
                
//                 <label htmlFor="flavourTop" className="colorPickerLabel">
//                     <input type="color"  value={color2} className="colorPicker" name="flavourTop" id="flavourTop"
//                         onChange={(e)=>{
//                             setColor2(e.target.value)
//                         }}
//                     />
//                 </label>
//                 <label htmlFor="flavourTop" className="colorPickerLabel">
//                     <input type="color"  value={color3} className="colorPicker" name="flavourTop" id="flavourTop"
//                         onChange={(e)=>{
//                             setColor3(e.target.value)
//                         }}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <div className="lollyFrom">
//                     <label htmlFor="recipientName">
//                         To                        
//                     </label>
//                     <input type="text" name="recipientName" id="recipientName" ref={recipientNameRef}/>
//                     <label htmlFor="recipientName">
//                         Message                       
//                     </label>
//                     <textarea rows="15" columns="30" ref={messageRef} />
//                     <label htmlFor="recipientName">
//                         From                        
//                     </label>
//                     <input type="text" name="senderName" id="senderName" ref={senderRef}/>
//                 </div>
//                 <input type="button" value="Create" onClick={submitLollyForm} />
//             </div>
//         </div>
//     </div>
//   );
// }


// import React, { useRef, useState } from "react";
// import Lolly from './../component/Lolly';
// import './../styles/main.css'
// import Header from './../component/Header';
// import { gql, useMutation, useQuery } from "@apollo/client";

// const GETDATA = gql `
// {
//     hello
// }`

// const createLollyMutation = gql `

//     mutation createLolly($recipientName: String!, $message: String!, $senderName: String!, $flavourTop: String!, $flavourMiddle: String!, $flavourBottom: String!) {
//         createLolly(recipientName: $recipientName, message: $message, senderName: $senderName, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle, flavourBottom: $flavourBottom){
//             message
//             lollyPath
//         }
//     }

// `
// export default function CreateNew() {
//     const [color1, setColor1]= useState("#e95946");
//     const [color2, setColor2]= useState("#d52358");
//     const [color3, setColor3]= useState("#deaa43");
//     const recipientNameRef = useRef();
//     const messageRef = useRef();
//     const senderRef = useRef();
//     // const {loading, error, data} = useQuery(GETDATA);
//     const [createLolly] = useMutation(createLollyMutation);

//     const submitLollyForm = async () => {
//         console.log("clicked")
//         console.log("color1",color1)
//         console.log("sender",senderRef.current.value)
//         const result = await createLolly({
//             variables : {
//                 recipientName: recipientNameRef.current.value,
//                 message : messageRef.current.value,
//                 senderName: senderRef.current.value,
//                 flavourTop: color1,
//                 flavourMiddle: color2,
//                 flavourBottom: color3
//             }
//         });
//         console.log("result from server",result );
//     }

//   return <div className="container">
//       {/* {data && data.hello && <div>{data.hello}</div>} */}
//       <Header/>
//       <div  className="lollyFormDiv">
//      <div>

//      <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3}/>
//      </div>
// {/* // */}
//      <div className="lollyFlavourDiv">
//          <label htmlFor="flavourTop" className="colorPickerLabel">
//          <input type="color" className="colorPicker" value={color1} name="flavourTop" id="flavourTop" 
//          onChange={(e)=>{
//              setColor1(e.target.value)
//          }}
//          />
//          </label>

//          <label htmlFor="flavourTop" className="colorPickerLabel">
//          <input type="color" className="colorPicker" value={color2} name="flavourTop" id="flavourTop"
//          onChange={(e)=>{
//             setColor2(e.target.value)
//         }}
//           />
//          </label>
    
//          <label htmlFor="flavourTop" className="colorPickerLabel">
//          <input type="color" className="colorPicker" value={color3} name="flavourTop" id="flavourTop"
//          onChange={(e)=>{
//             setColor3(e.target.value)
//         }} />

//          </label>
    
    
//      </div>
// {/* //      */}
//      <div>
//          <div className="lollyFrom"> 
//              <label htmlFor="recipientName">
//                  To
//              </label>
//              <input type="text" name="recipientName" id="recipientName" red={recipientNameRef} />
// {/*  */}
//              <label htmlFor="recipientName">
//                  Message
//              </label>
//              <textarea rows="15" columns="30" ref={messageRef}/>
// {/*  */}
//              <label htmlFor="recipientName">
//                 From
//              </label>
//              <input type="text" name="senderName" id="senderName" ref={senderRef}/>

//          </div>
//          <input type="button" value="Create" onClick={submitLollyForm}/>
//      </div>
//      {/* // */}
//      </div>
//   </div>
// }
