import gql from 'graphql-tag'

export const currentUser = gql`
  query {
    viewer {
      user {
        id
        email
        name
      }
    }
  }
`;
