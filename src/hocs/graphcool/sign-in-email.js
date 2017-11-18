import { AsyncStorage, Alert } from 'react-native';
import { graphql, withApollo } from 'react-apollo';
import { withState, compose } from 'recompose';
import { authenticateUserMutation } from './mutations'

export default () => compose(
  /**
   * Get access to client object to call client.resetStore
   */
  withApollo,
  /**
   * State
   */
	withState('loadingEmail', 'setLoadingEmail', false),
  /**
   * E-mail Authentication
   */
  graphql(authenticateUserMutation, {
    props: ({ ownProps: { setLoadingEmail, client, onSuccessEmail }, mutate }) => ({
      signInWithEmail: async (email, password) => {
        setLoadingEmail(true);
        try {
          /**
           * Sign in with given email and password
           */
          const authenticateUserResponse = await mutate({
            variables: {
              email,
              password,
            },
          });
          /**
           * Write obtained token to local STORAGE
           */
          const token = authenticateUserResponse.data.authenticateUser.token;
          if (token) {
            await AsyncStorage.setItem('token', token);
            client.resetStore();
            onSuccessEmail()
          } else {
            throw new Error('Nenhum token na resposta');
          }
        } catch (err) {
          Alert.alert(err.toString()) //  TODO
        } finally {
          setLoadingEmail(false);
        }
      },
    }),
  }),
)
