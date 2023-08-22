import * as React from "react"
import { graphql, Script } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Container, Row } from "react-bootstrap"
import PostsList from "../components/PostsList"



const IndexPage = ({ data }) => {
  // const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const metadata = data.site.siteMetadata

  return (
    <Layout>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <Container>
        <h1 style={{ padding: `30px`, textAlign: `center` }}>
          {metadata.title}
        </h1>
        <p style={{ textAlign: `center`, marginBottom: `25px`, fontStyle: `italic`, fontSize: `x-large`, fontWeight: `bolder`}}>{metadata.description}</p>
        <Row className="g-4" style={{marginBottom: `50px`}} >          
          <PostsList posts={posts} />
        </Row>
      </Container>
    </Layout>
  )
}
      

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Главная" />

export default IndexPage

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: {fields: {slug: {glob: "/my-articles/*/"}}}
      sort: {frontmatter: {date: DESC}}
      ) {
    nodes {
      id      
      fields {
        slug
        tags
      }
      frontmatter {
        category        
        title        
        date(formatString: "MMM DD, YYYY ")
        featured_image {
          childImageSharp {
            gatsbyImageData(width: 600, aspectRatio: 1.5, placeholder: BLURRED)
          }
        }
      }
    }
  }
  }
`