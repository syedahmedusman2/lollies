module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Lolly",
        fieldName: "Lollies",
        url: "https://eloquent-villani-d3e592.netlify.app/.netlify/functions/newLolly",
      },
    },
  ],
}