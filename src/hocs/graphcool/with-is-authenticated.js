import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { currentUser } from './queries'

export default compose(
  graphql(currentUser, {
    props: ({ data }) => ({
      authenticated: !!((data.viewer && data.viewer.user && data.viewer.user.id)),
      loading: data.loading,
    }),
  }),
)
