import React from 'react';
import { View, Image, Alert } from 'react-native';
import { func, bool } from 'prop-types';
import styled from 'styled-components/native';
import TextInput from '../common/TextInput';
import PasswordInput from './PasswordInput';
import Button from '../common/Button';

const userImage = require('../resources/assets/icon-user.png');
const emailImage = require('../resources/assets/icon-email.png');


const Wrapper = styled(View)`
  flex: 1;
`;
const StyledTextInput = styled(TextInput)`
  margin-bottom: 20px
`;
const StyledPasswordInput = styled(PasswordInput)`
  margin-bottom: 30px;
`;
const LoginWithPasswordButton = styled(Button)`
`;

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }
  handleChangeName = name => this.setState({
    name,
  })

  handleChangeEmail = (email) => {
    this.setState({
      email,
    });
  }
  handleChangePassword = (password) => {
    this.setState({
      password,
    });
  }

  handleSignUpPress = () => {
    const {
      signUp,
    } = this.props;
    const {
      name,
      email,
      password,
    } = this.state;
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos')
    } else {
      signUp(name, email, password);
    }
  }
  render() {
    const {
      name,
      email,
      password,
    } = this.state;
    const {
      loading,
    } = this.props;

    return (
      <Wrapper>
        <StyledTextInput
          leftIcon={<Image source={userImage} />}
          placeholder="Nome completo"
          value={name}
          onChangeText={this.handleChangeName}
        />
        <StyledTextInput
          leftIcon={<Image source={emailImage} />}
          autoCapitalize="none"
          placeholder="E-mail"
          value={email}
          onChangeText={this.handleChangeEmail}
        />
        <StyledPasswordInput
          value={password}
          onChangeText={this.handleChangePassword}
        />
        <LoginWithPasswordButton
          title="Cadastrar"
          loading={loading}
          disabled={loading}
          onPress={this.handleSignUpPress}
        />
      </Wrapper>
    );
  }
}

SignUpForm.propTypes = {
  signUp: func.isRequired,
  loading: bool.isRequired,
};
export default SignUpForm;
