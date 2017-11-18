import React from 'react';
import { element, bool, func } from 'prop-types';
import { TextInput as RNTextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const TEXT_DARK_COLOR = '#484747';
const TEXT_LIGHT_COLOR = '#FFFFFF';

const Wrapper = styled(View)`
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.dark ? TEXT_DARK_COLOR : TEXT_LIGHT_COLOR};
  flex-direction: row;
  align-items: center;
`;
const StyledTextInput = styled(RNTextInput)`
  flex: 1;
  padding-vertical: 0px;
  color: ${props => props.dark ? TEXT_DARK_COLOR : TEXT_LIGHT_COLOR};
  padding-horizontal: 10px;
  font-size: 16px;
`;

const styles = StyleSheet.create({
  iconStyle: {
    width: 22,
    height: 22,
  },
});
const TextInput = ({
  style,
  leftIcon,
  rightIcon,
  dark,
  onPressRightIcon,
  ...props
}) => (
  <Wrapper dark={dark} style={style}>
    {leftIcon && React.cloneElement(leftIcon, { style: styles.iconStyle, resizeMode: 'contain' })}
    <StyledTextInput
      dark={dark}
      placeholderTextColor={dark ? TEXT_DARK_COLOR : TEXT_LIGHT_COLOR}
      selectionColor={dark ? TEXT_DARK_COLOR : TEXT_LIGHT_COLOR}
      underlineColorAndroid="transparent"
      {...props}
    />
    {rightIcon && (
      <TouchableOpacity onPress={() => onPressRightIcon && onPressRightIcon()} style={{ padding: 6 }}>
        {React.cloneElement(rightIcon, { style: styles.iconStyle, resizeMode: 'contain' })}
      </TouchableOpacity>
    )}
  </Wrapper>

);

TextInput.propTypes = {
  style: RNTextInput.propTypes.style,
  leftIcon: element,
  rightIcon: element,
  onPressRightIcon: func,
  dark: bool,
};
TextInput.defaultProps = {
  style: null,
  leftIcon: null,
  rightIcon: null,
  onPressRightIcon: null,
  dark: false,
};
export default TextInput;
