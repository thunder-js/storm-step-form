import React from 'react';
import {
  Animated,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { number, string } from 'prop-types';

const Wrapper = styled(View)`
  height: 10px;
  background-color: #d3d3d3;
  align-self: stretch;
  overflow: hidden;
`;


class AnimatedProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widthAnimation: new Animated.Value(0),
    };

    this.animateWidth(this.props.progress);
  }

  animateWidth(toValue) {
    Animated.timing(this.state.widthAnimation, {
      toValue,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.progress !== this.props.progress) {
      this.animateWidth(nextProps.progress);
    }
  }
  render() {
    const widthPercentage = this.state.widthAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 2],
    });

    return (
      <Wrapper>
        <Animated.View
          style={{
            height: 20,
            backgroundColor: this.props.color,
            width: '100%',
            marginLeft: '-50%',
            transform: [{
              scaleX: widthPercentage,
            }],
          }}
        />
      </Wrapper>
    );
  }
}

AnimatedProgressBar.propTypes = {
  progress: number.isRequired,
  color: string.isRequired,
};
export default AnimatedProgressBar;
