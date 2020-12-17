import React from "react"
import Lolly from './../Lolly';
import gql from "graphql-tag"
import Header from "./../Header"
import { Link } from "gatsby"
import { useQuery } from "@apollo/client"

export const query = gql`
  query getLollyByPath($lollyPath: String!) {
    getLollyByPath(lollyPath: $lollyPath) {
      flavorBot
      flavorMid
      flavorTop
      lollyPath
      message
      recipientName
      sendersName
    }
  }
`

export default function LollyPage({ pathContext: { lollyPath  } }) {
  const { data, loading, error } = useQuery(query, {
    variables: { lollyPath: lollyPath },
  })
  console.log(data);
  
  
  if (error) {
    return <h4>error</h4>
  }
  return (
    <div>
      <Header />
      {loading ? (
        <div>
          <h4>Loading</h4>
        </div>
      ) : data !== undefined || null && data.bookmarks.length !== 0 ? (
        <div className="freezedLollyCardWrapper">
          <Lolly
            fillLollyTop={data.getLollyByPath?.flavourTop}
            fillLollyBottom={data.getLollyByPath?.flavourBot}
            fillLollyMiddle={data.getLollyByPath?.flavourMid}
          />

          <div className="freezedLollyData">
            <div className="linkWrapper">
              <h4>Share this link with your frined</h4>
              <p>{`/lollies/${data?.getLollyByPath?.lollyPath}`}</p>
            </div>
            <div className="freezedLollyCard">
              <h1>to: {data?.getLollyByPath?.recipientName}</h1>
              <p>{data?.getLollyByPath?.message}</p>
              <h3>From: {data?.getLollyByPath?.sendersName}</h3>
            </div>
            <div className="recivermessage">
              <p>
                {data?.getLollyByPath?.sendersName} made this virtual lollipop
                for you. You can <Link to="/createNew"> make your own</Link> to
                send to a friend who deserve some sugary treat which won't rot
                their teeth...
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}