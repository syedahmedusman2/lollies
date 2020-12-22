module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Lolly",
        fieldName: "Lollies",
        url: "http://localhost:8000/.netlify/functions/newLolly",
      },
    },
  ],
}