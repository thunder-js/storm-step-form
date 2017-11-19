import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { object } from 'prop-types'
import styled from 'styled-components/native'

const ButtonWrapper = styled(TouchableOpacity)`
  background-color: ${props => props.disabled ? '#d3d3d3' : props.color};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;
const ButtonImage = styled(Image)`
  width: 33px;
  height: 33px;
`;

const CircleButton = ({
  imageSource,
  disabled,
  color,
  ...props
}) => (
  <ButtonWrapper
    {...props}
    disabled={disabled}
    color={color}
  >
    {imageSource &&
      <ButtonImage
        source={imageSource}
      />
    }

  </ButtonWrapper>
)
CircleButton.defaultProps = {
  imageSource: null,
}
CircleButton.propTypes = {
  imageSource: object,
}
export default CircleButton
