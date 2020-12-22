import React from "react";
import Lolly from './../component/Lolly'


export default function LollyPage(lolly) {

  const {location, pageContext} = lolly;
  return (
    <div>

      <h5 className="sharableLinkContainer">Copy This Link To Share: </h5>{" "}
      <span className="sharableLink">
        {" "}
        {`https://eloquent-villani-d3e592.netlify.app${location.pathname}/`}
      </span>
      <div className="recievedContentContainer">
        <Lolly
          fillLollyTop={pageContext.lolly.topColor}
          fillLollyMiddle={pageContext.lolly.mediumColor}
          fillLollyBottom={pageContext.lolly.bottomColor}
        />

        <div className="recievedTextContainer">
          <h3>HI {pageContext.lolly.recipientName}</h3>
          <p>{pageContext.lolly.message}</p>
          <h4>From: {pageContext.lolly.senderName}</h4>
        </div>
      </div>
    </div>
  );
}