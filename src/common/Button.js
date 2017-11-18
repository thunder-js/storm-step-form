import React from 'react';
import { bool, string } from 'prop-types';
import { Image, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled(TouchableOpacity)`
  height: 54px;
  background-color: rgba(255, 255, 255, 0.42);
  align-items: center;
  justify-content: center;
  border-radius: 27px;
  flex-direction: row;
`;
const ButtonImage = styled(Image)`
  margin-right: 14px;
`;

const ButtonText = styled(Text)`
  color: #FFF;
`;

const AuthButton = ({
  title,
	imageSource,
	loading,
  ...props
}) => (
  <Wrapper {...props}>
    {loading &&
      <ActivityIndicator color="#FFF" />
		}
    {(!loading && imageSource) &&
      <ButtonImage
        resizeMode="contain"
        source={imageSource}
      />
    }
    {!loading && (
    <ButtonText>
      {title}
    </ButtonText>
		)}
  </Wrapper>
);

AuthButton.propTypes = {
  title: string.isRequired,
  imageSource: Image.propTypes.source,
  loading: bool,
};
AuthButton.defaultProps = {
  imageSource: null,
  loading: false,
};


export default AuthButton;
