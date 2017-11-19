import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { string } from 'prop-types'
import styled from 'styled-components/native'

const ButtonWrapper = styled(TouchableOpacity)`
  background-color: transparent;
`

const ButtonText = styled(Text)`
  background-color: transparent;
`
const FlatButton = ({
  title,
  ...props
}) => (
  <ButtonWrapper {...props}>
    <ButtonText>
      {title}
    </ButtonText>
  </ButtonWrapper>
)
FlatButton.propTypes = {
  title: string.isRequired,
}

export default FlatButton
