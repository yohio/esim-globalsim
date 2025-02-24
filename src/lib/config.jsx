const config = {
    siteName: 'Global sims',
    siteDescription: "Global sims is a website that provides information about the world's most popular games.",
    siteUrl: process.env.NEXT_PUBLIC_WP_URL,
    graphqlUrl: process.env.NEXT_PUBLIC_WP_GRAPHQL_URL,
    revalidate: 3600 // 1 hour
  }
  
  export default config
  