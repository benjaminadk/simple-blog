import gql from 'graphql-tag'

export const UPDATE_POST_MUTATION = gql`
  mutation(
    $postId: ID
    $title: String
    $subTitle: String
    $body: String
    $words: Int
    $image: String
    $tags: [String]
  ) {
    updatePost(
      postId: $postId
      title: $title
      subTitle: $subTitle
      body: $body
      words: $words
      image: $image
      tags: $tags
    ) {
      success
      message
    }
  }
`
