import gql from 'graphql-tag'

export const ALL_POSTS_PAGINATED_QUERY = gql`
  query($first: Int, $after: String) {
    allPostsPaginated(first: $first, after: $after) {
      totalCount
      edges {
        cursor
        node {
          id
          title
          subTitle
          body
          tags
          image
          createdAt
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`