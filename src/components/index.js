import React from 'react'
import { Dimensions, View, Text, ScrollView, Button } from 'react-native'
import styled from 'styled-components/native'
import { arrayOf, any, func, number } from 'prop-types'
import AnimatedProgressBar from '../common/AnimatedProgressBar'
import CircleButton from '../common/CircleButton'
import FlatButton from '../common/FlatButton'

const { width } = Dimensions.get('window');

const Wrapper = styled(View)`
  flex: 1;
`
const ScrollSteps = styled(ScrollView)`
  width: ${width}px;
  flex: 1;
`

const Step = styled(View)`
  width: ${width}px;
  flex: 1;
`

const ButtonRow = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;

`
const Footer = styled(View)`
  height: 100px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
`

class StepForm extends React.Component {
  static defaultProps = {
    step: undefined,
  }
  static propTypes = {
    step: number,
    steps: arrayOf(any).isRequired,
    renderStep: func.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
    }
  }
  shouldUseOwnState = () => this.props.step === undefined

  handleNext = () => {
    if (!this.shouldUseOwnState()) return
    if (this.state.step >= this.props.steps.length) return
    this.setState({
      step: this.state.step + 1,
    }, () => (
    this.setScrollPosition(this.state.step)
    ))
  }
  handleBack = () => {
    if (!this.shouldUseOwnState()) return
    if (this.state.step <= 0) return
    this.setState({
      step: this.state.step - 1,
    }, () => {
      this.setScrollPosition(this.state.step)
    })
  }

  handleSend = () => {
    alert('Finish!')
  }

  setScrollPosition = (step) => {
    this.scrollView.scrollTo({ y: 0, x: step * width });
  }
  componentWillReceiveProps(nextProps) {
    if (!this.shouldUseOwnState() && (this.props.step !== nextProps.step)) {
      this.setScrollPosition(nextProps.step)
    }
  }

  getProgress = () => {
    const stepNumber = this.shouldUseOwnState() ? this.state.step : this.props.step
    return (stepNumber + 1) / (this.props.steps.length || 1)
  }

  render() {
    const stepNumber = this.shouldUseOwnState() ? this.state.step : this.props.state
    const maxSteps = this.props.steps.length
    const lastPage = maxSteps - 1

    return (
      <Wrapper>
        <ScrollSteps
          horizontal
          innerRef={(ref) => { this.scrollView = ref; }}
          showsHorizontalScrollIndicator
          pagingEnabled
          scrollEnabled
        >
          {
            this.props.steps.map((step, i) => (
              <Step key={`step_${i}`} style={{ backgroundColor: 'steelblue' }}>
                {this.props.renderStep(step)}
              </Step>
            ))
          }
        </ScrollSteps>
        <Footer>
          <ButtonRow>
            <View style={{ flex: 1 }}>
              {(stepNumber > 0) &&
                <FlatButton
                  title="VOLTAR"
                  onPress={this.handleBack}
                  style={{ alignSelf: 'flex-start' }}
                />}
            </View>
            <View style={{ flex: 1 }}>
              {(stepNumber < lastPage) ?
                <CircleButton
                  color="lightgreen"
                  onPress={this.handleNext}
                  style={{ alignSelf: 'flex-end' }}
                />
              :
                <CircleButton
                  color="tomato"
                  onPress={this.handleSend}
                  style={{ alignSelf: 'flex-end' }}
                />}
            </View>
          </ButtonRow>

          <AnimatedProgressBar
            progress={this.getProgress()}
            color="tomato"
          />
        </Footer>


      </Wrapper>

    )
  }
}

export default StepForm
