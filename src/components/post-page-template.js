import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"

export const query = graphql`
  query PostsByID($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date(formatString: "YYYY MMMM Do")
      }
    }
  }
`

export default ({ data, pageContext }) => {
  const { frontmatter, body } = data.mdx
  console.log({ pageContext })
  const next = pageContext.next
    ? {
        url: `${pageContext.next.fields.slug}`,
        title: pageContext.next.frontmatter.title,
      }
    : null
  const prev = pageContext.prev
    ? {
        url: `${pageContext.prev.fields.slug}`,
        title: pageContext.prev.frontmatter.title,
      }
    : null
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <MDXRenderer>{body}</MDXRenderer>
      <br></br>
      <div>
        {prev && (
          <Link to={prev.url}>
            <span>Previous</span>
            <h3>{prev.title}</h3>
          </Link>
        )}
        {next && (
          <Link to={next.url}>
            <span>Next</span>
            <h3>{next.title}</h3>
          </Link>
        )}
      </div>
    </div>
  )
}
