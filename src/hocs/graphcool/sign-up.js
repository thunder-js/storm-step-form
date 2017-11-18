import { graphql } from 'react-apollo';
import { withState, compose } from 'recompose';
import { AsyncStorage, Alert } from 'react-native';
import { signupUserMutation } from './mutations'

export default () => compose(
	withState('loading', 'setLoading', false),
	graphql(signupUserMutation, {
  props: ({ ownProps: { setLoading, onSuccess }, mutate }) => ({
    signUp: async (name, email, password) => {
      setLoading(true);
      try {
				/**
				* Sign up with given email and password
				*/
        const signupResponse = await mutate({
          variables: {
            name,
            email,
            password,
          },
        });
        setLoading(false);
				/**
				* Write obtained token to local STORAGE
				*/
        const token = signupResponse.data.signupUser.token;
        if (token) {
          await AsyncStorage.setItem('token', token);
          // client.resetStore()
          onSuccess()
        } else {
          throw new Error('No token on response');
        }
      } catch (err) {
        Alert.alert(err.toString()) // TODO
      } finally {
        setLoading(false);
      }
    },
  }),
}),
)
