import gql from 'graphql-tag'

export const signupUserMutation = gql`
	mutation signupUser($email:String!, $password:String!, $name:String!){
		signupUser(email:$email, password:$password, name:$name) {
			id
			token
		}
	}
`

export const authenticateUserMutation = gql`
	mutation authenticateUser($email:String!, $password:String!) {
		authenticateUser(email:$email, password:$password) {
			token
		}
	}
`

export const facebookAuthenticateUserMutation = gql`
	mutation facebookAuthenticateUser($facebookToken:String!){
		facebookAuthenticateUser(facebookToken:$facebookToken){
			id
			token
		}
	}
`
