import React from "react";
import Lolly from "./../component/Lolly";
import { gql, useMutation, useQuery } from "@apollo/client";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import shortId from "shortid";
import {navigate} from 'gatsby'







const CREATE_LOLLY_MUTATION = gql`
  mutation createLolly(
    $recipientName: String!
    $message: String!
    $senderName: String!
    $topColor: String!
    $mediumColor: String!
    $bottomColor: String!
    $path: String!
  ) {
    createLolly(recipientName: $recipientName, message: $message, senderName: $senderName, topColor: $topColor, mediumColor: $mediumColor, bottomColor: $bottomColor, path: $path)
     {
      message
      }
  }
`;

const initialValues = {
    to: "",
    message: "",
    from: "",
  };
  
  const validationSchema = Yup.object({
    to: Yup.string().required("Recipient name is required"),
  
    message: Yup.string()
      .required("Message is required")
      .max(500, "Message should be less than 500 character"),
    from: Yup.string().required("Sender name is Required"),
  });


const CreateLolly = () => {

  const [fillLollyTop, setfillLollyTop] = React.useState("#d52358");
  const [fillLollyMiddle, setfillLollyMiddle] = React.useState("#e95946");
  const [fillLollyBottom, setfillLollyBottom] = React.useState("#deaa43");

  const [createLolly] = useMutation(CREATE_LOLLY_MUTATION);
  // const { data, error, loading } = useQuery(GET_LOLLY_BY_SLUG);

 const onSubmit = async (values, actions) => {
  const slug = shortId.generate();
  const result = await createLolly({
    variables: {
      recipientName: values.to,
      message: values.message,
      senderName: values.from,
      topColor: fillLollyTop,
      mediumColor: fillLollyMiddle,
      bottomColor: fillLollyBottom,
      path: slug.toString(),
    },
  });

  await actions.resetForm({
    values: {
      to: "",
      message: "",
      from: "",
    },
  });


  await navigate(`/lolly/${slug}`);
};

  return (
    
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <div>
        <Lolly
          fillLollyTop={fillLollyTop}
          fillLollyMiddle={fillLollyMiddle}
          fillLollyBottom={fillLollyBottom}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "30vh"
        }}
      >
          <input
            type="color"
            value={fillLollyTop}
            onChange={(e) => setfillLollyTop(e.target.value)}
            style={{color: {fillLollyBottom} , cursor: "pointer", width: "35px", height: "35px", borderRadius: "20%"}}
          />
       
          <input
            type="color"
            value={fillLollyMiddle}
            onChange={(e) => setfillLollyMiddle(e.target.value)}
            style={{color: {fillLollyBottom} , cursor: "pointer", width: "35px", height: "35px", borderRadius: "20%"}}
          />
        
        
          <input
            type="color"
            value={fillLollyBottom}
            style={{color: {fillLollyBottom} , cursor: "pointer", width: "35px", height: "35px", borderRadius: "20%"}}
            onChange={(e) => setfillLollyBottom(e.target.value)}
          />
        
      </div>
      <div >
        <Paper style={{
              width: "400px",
              margin: "0 auto",
              padding: "30px 0px ",
            }}>
        <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form style={{padding: "14px"}}>
                <Field
                  as={TextField}
                  id="To"
                  type="text"
                  label="To"
                  variant="outlined"
                  name="to"
                  fullWidth
                  style={{ marginTop: "10px" }}
                />
                

                <Field
                  as={TextField}
                  id="Message"
                  label="Message"
                  multiline
                  type="text"
                  rows={4}
                  fullWidth
                  variant="outlined"
                  name="message"
                  style={{ marginTop: "10px" }}
                />
                

                <Field
                  as={TextField}
                  id="name"
                  type="text"
                  name="from"  
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: "10px" }}
                />
                

                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  type="submit"
                  style={{ marginTop: "10px" }}
                >
                  SEND YOUR VIRTUAL LOLLY
                </Button>
              </Form>
            </Formik>
        </Paper>
      </div>
    </div>
  );
};

export default CreateLolly;














// import React, { useState } from "react"
// import Header from './../component/Header'
// import Lolly from "./../component/Lolly"
// import { useMutation } from "@apollo/client"
// import gql from "graphql-tag"
// import shortid from "shortid"
// import { navigate } from "gatsby"

// const createLollyMutation = gql`
//   mutation createLolly(
//     $recipientName: String!
//     $senderName: String!
//     $message: String!
//     $topColor: String!
//     $mediumColor: String!
//     $bottomColor: String!
//     $path: String!
//   ) {
//     createLolly(
//       recipientName: $recipientName
//       senderName: $senderName
//       message: $message
//       topColor: $topColor
//       mediumColor: $mediumColor
//       bottomColor: $bottomColor
//       lollyPath: $path
//     ) {
//       message
//       lollyPath
//     }
//   }
// `

// export default function CreateNew() {
//   const [createLolly] = useMutation(createLollyMutation)

//   const [flavourTop, setFlavourTop] = useState("#ef0078")
//   const [flavourMiddle, setFlavourMiddle] = useState("#ff8d00")
//   const [flavourEnd, setFlavourEnd] = useState("#dd0074")
//   const [recipentName, setRecipentName] = useState("")
//   const [message, setMessage] = useState("")
//   const [senderName, setSenderName] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async () => {
//     setLoading(true)
//     const slug = shortid.generate()
//     const result = await createLolly({
//       variables: {
//         recipientName: recipentName,
//         senderName: senderName,
//         message: message,
//         topColor: flavourTop,
//         mediumColor: flavourMiddle,
//         bottomColor: flavourEnd,
//         Path: slug.toString()  
//       },
//     })
//     setLoading(false)
//     await navigate(`/LollyPage${slug}`);
//   }

//   return (
//     <div className="container">
//       <Header />
      
//       <div className="lollyContainer">
//         <div>
//           <Lolly
//             fillLollyBottom={flavourEnd}
//             fillLollyMiddle={flavourMiddle}
//             fillLollyTop={flavourTop}
//           />
//         </div>
//         <div className="colorContainer">
//           <label>
//             <input
//               type="color"
//               name="top"
//               value={flavourTop}
//               onChange={e => setFlavourTop(e.target.value)}
//             />
//           </label>
//           <label>
//             <input
//               type="color"
//               name="middle"
//               value={flavourMiddle}
//               onChange={e => setFlavourMiddle(e.target.value)}
//             />
//           </label>
//           <label>
//             <input
//               type="color"
//               name="bottom"
//               value={flavourEnd}
//               onChange={e => setFlavourEnd(e.target.value)}
//             />
//           </label>
//         </div>
//         <div className="formContainer">
//           <label>To</label>
//           <input
//             type="text"
//             required
//             onChange={e => setRecipentName(e.target.value)}
//           />
//           <label>Message</label>
//           <textarea
//             style={{ resize: "none" }}
//             rows={7}
//             required
//             onChange={e => setMessage(e.target.value)}
//           />
//           <label>From</label>
//           <input
//             type="text"
//             required
//             onChange={e => setSenderName(e.target.value)}
//           />
//           <div className="formBtn-wrapper">
//             <button onClick={handleSubmit}>
//             {/* onClick={()=>{
//       { navigate("/LollyPage")}
//      }} */}
//               {loading ? "freeze..." : "freeze"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




// // import { gql, useMutation, useQuery } from "@apollo/client";
// // import React, { useRef, useState } from "react"
// // import Header from "../component/Header"
// // import Lolly from "../component/Lolly"

// // const GETDATA = gql`
// //     {
// //         hello
// //     }
// // `

// // const createLollyMutation = gql`
// //     mutation createLolly($recipientName: String!, $message: String!, $senderName: String!, $flavourTop: String!, $flavourMiddle: String!,$flavourBottom: String!) {
// //         createLolly(recipientName: $recipientName, message: $message, senderName: $senderName, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle,flavourBottom: $flavourBottom) {
// //             message
// //             lollyPath
// //         }
// //     }
// // `

// // export default function CreateNew() {
// //     const [color1, setColor1] = useState("#d52358");
// //     const [color2, setColor2] = useState("#e95946");
// //     const [color3, setColor3] = useState("#deaa43");
// //     const recipientNameRef = useRef();
// //     const messageRef = useRef();
// //     const senderRef = useRef();

// //     //const {loading, error, data } = useQuery(GETDATA);
// //     const [createLolly] = useMutation(createLollyMutation);

// //     const submitLollyForm = async () => {
// //         console.log("clicked");
// //         console.log("color 1", color1);
// //         console.log("sender", senderRef.current.value);
// //         const result = await createLolly({
// //             variables : {
// //                 recipientName: recipientNameRef.current.value,
// //                 message : messageRef.current.value,
// //                 senderName: senderRef.current.value,
// //                 flavourTop: color1,
// //                 flavourMiddle: color2,
// //                 flavourBottom: color3
// //             }
// //         });
// //         console.log("result form server = ",result);
// //     }

// //   return (
// //     <div className="container">
// //       {/*data && data.hello && <div>{data.hello}</div>*/}
// //       <Header />

// //         <div className="lollyFormDiv">
// //             <div>
// //                 <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3} />
// //             </div>
// //             <div className="lollyFlavourDiv">
// //                 <label htmlFor="flavourTop" className="colorPickerLabel">
// //                     <input type="color"  value={color1} className="colorPicker" name="flavourTop" id="flavourTop"
// //                         onChange={(e)=>{
// //                             setColor1(e.target.value)
// //                         }}
                    
// //                     />
// //                 </label>
                
// //                 <label htmlFor="flavourTop" className="colorPickerLabel">
// //                     <input type="color"  value={color2} className="colorPicker" name="flavourTop" id="flavourTop"
// //                         onChange={(e)=>{
// //                             setColor2(e.target.value)
// //                         }}
// //                     />
// //                 </label>
// //                 <label htmlFor="flavourTop" className="colorPickerLabel">
// //                     <input type="color"  value={color3} className="colorPicker" name="flavourTop" id="flavourTop"
// //                         onChange={(e)=>{
// //                             setColor3(e.target.value)
// //                         }}
// //                     />
// //                 </label>
// //             </div>
// //             <div>
// //                 <div className="lollyFrom">
// //                     <label htmlFor="recipientName">
// //                         To                        
// //                     </label>
// //                     <input type="text" name="recipientName" id="recipientName" ref={recipientNameRef}/>
// //                     <label htmlFor="recipientName">
// //                         Message                       
// //                     </label>
// //                     <textarea rows="15" columns="30" ref={messageRef} />
// //                     <label htmlFor="recipientName">
// //                         From                        
// //                     </label>
// //                     <input type="text" name="senderName" id="senderName" ref={senderRef}/>
// //                 </div>
// //                 <input type="button" value="Create" onClick={submitLollyForm} />
// //             </div>
// //         </div>
// //     </div>
// //   );
// // }


// // import React, { useRef, useState } from "react";
// // import Lolly from './../component/Lolly';
// // import './../styles/main.css'
// // import Header from './../component/Header';
// // import { gql, useMutation, useQuery } from "@apollo/client";

// // const GETDATA = gql `
// // {
// //     hello
// // }`

// // const createLollyMutation = gql `

// //     mutation createLolly($recipientName: String!, $message: String!, $senderName: String!, $flavourTop: String!, $flavourMiddle: String!, $flavourBottom: String!) {
// //         createLolly(recipientName: $recipientName, message: $message, senderName: $senderName, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle, flavourBottom: $flavourBottom){
// //             message
// //             lollyPath
// //         }
// //     }

// // `
// // export default function CreateNew() {
// //     const [color1, setColor1]= useState("#e95946");
// //     const [color2, setColor2]= useState("#d52358");
// //     const [color3, setColor3]= useState("#deaa43");
// //     const recipientNameRef = useRef();
// //     const messageRef = useRef();
// //     const senderRef = useRef();
// //     // const {loading, error, data} = useQuery(GETDATA);
// //     const [createLolly] = useMutation(createLollyMutation);

// //     const submitLollyForm = async () => {
// //         console.log("clicked")
// //         console.log("color1",color1)
// //         console.log("sender",senderRef.current.value)
// //         const result = await createLolly({
// //             variables : {
// //                 recipientName: recipientNameRef.current.value,
// //                 message : messageRef.current.value,
// //                 senderName: senderRef.current.value,
// //                 flavourTop: color1,
// //                 flavourMiddle: color2,
// //                 flavourBottom: color3
// //             }
// //         });
// //         console.log("result from server",result );
// //     }

// //   return <div className="container">
// //       {/* {data && data.hello && <div>{data.hello}</div>} */}
// //       <Header/>
// //       <div  className="lollyFormDiv">
// //      <div>

// //      <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3}/>
// //      </div>
// // {/* // */}
// //      <div className="lollyFlavourDiv">
// //          <label htmlFor="flavourTop" className="colorPickerLabel">
// //          <input type="color" className="colorPicker" value={color1} name="flavourTop" id="flavourTop" 
// //          onChange={(e)=>{
// //              setColor1(e.target.value)
// //          }}
// //          />
// //          </label>

// //          <label htmlFor="flavourTop" className="colorPickerLabel">
// //          <input type="color" className="colorPicker" value={color2} name="flavourTop" id="flavourTop"
// //          onChange={(e)=>{
// //             setColor2(e.target.value)
// //         }}
// //           />
// //          </label>
    
// //          <label htmlFor="flavourTop" className="colorPickerLabel">
// //          <input type="color" className="colorPicker" value={color3} name="flavourTop" id="flavourTop"
// //          onChange={(e)=>{
// //             setColor3(e.target.value)
// //         }} />

// //          </label>
    
    
// //      </div>
// // {/* //      */}
// //      <div>
// //          <div className="lollyFrom"> 
// //              <label htmlFor="recipientName">
// //                  To
// //              </label>
// //              <input type="text" name="recipientName" id="recipientName" red={recipientNameRef} />
// // {/*  */}
// //              <label htmlFor="recipientName">
// //                  Message
// //              </label>
// //              <textarea rows="15" columns="30" ref={messageRef}/>
// // {/*  */}
// //              <label htmlFor="recipientName">
// //                 From
// //              </label>
// //              <input type="text" name="senderName" id="senderName" ref={senderRef}/>

// //          </div>
// //          <input type="button" value="Create" onClick={submitLollyForm}/>
// //      </div>
// //      {/* // */}
// //      </div>
// //   </div>
// // }
