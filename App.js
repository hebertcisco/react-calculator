import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import Button from "./src/components/Button";
import Display from "./src/components/Display";

let variableA;
let variableB;
let result;

export default class App extends Component {
  state = {
    display: 0,
    operation: "",
    shouldConcatenateDigit: false,
  };

  concatenateDigit = (digit) => {
    if (this.state.shouldConcatenateDigit) {
      this.setState((prevState) => ({
        display: prevState.display + digit,
      }));
    } else {
      this.setState({
        display: digit,
        shouldConcatenateDigit: true,
      });
    }
  };

  activateOperation = (operation) => {
    variableA = Number(this.state.display);
    this.setState({
      shouldConcatenateDigit: false,
      operation,
    });
  };

  generateResult = () => {
    switch (this.state.operation) {
      case "division":
        variableB = Number(this.state.display);
        result = variableA / variableB;
        this.setState({
          display: +result.toFixed(5),
          operation: "",
        });
        break;
      case "multiplication":
        variableB = Number(this.state.display);
        result = variableA * variableB;
        this.setState({
          display: +result.toFixed(5),
          operation: "",
        });
        break;
      case "subtraction":
        variableB = Number(this.state.display);
        result = variableA - variableB;
        this.setState({
          display: +result.toFixed(5),
          // This tweak fixes erros like 0.3 - 0.2 !== 0.1
          operation: "",
        });
        break;
      case "addition":
        variableB = Number(this.state.display);
        result = variableA + variableB;
        this.setState({
          display: +result.toFixed(5),
          // This tweak fixes errors like 0.1 + 0.2 !== 0.3
          operation: "",
        });
        break;
      default:
        return null;
    }
  };

  cancelButton = () => {
    if (!this.state.shouldConcatenateDigit && this.state.display === 0) {
      this.setState({
        operation: "",
      });
    }
    this.setState({
      display: 0,
      shouldConcatenateDigit: false,
    });
  };

  addDot = () => {
    if (Math.round(this.state.display) === Number(this.state.display)) {
      this.setState((prevState) => ({
        display: `${prevState.display}.`,
        shouldConcatenateDigit: true,
      }));
    }
  };

  percentage = () => {
    this.setState((prevState) => ({
      display: prevState.display / 100,
    }));
  };

  invertSignal = () => {
    this.setState((prevState) => ({
      display: prevState.display * -1,
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Display display={this.state.display} />
        <View style={styles.row}>
          <Button
            backgroundColor="#50fa7b"
            color="#282a36"
            text={this.state.display ? "C" : "AC"}
            function={() => this.cancelButton()}
          />
          <Button
            backgroundColor="#50fa7b"
            color="#282a36"
            text="+/-"
            function={() => this.invertSignal()}
          />
          <Button
            backgroundColor="#50fa7b"
            color="#282a36"
            text="%"
            function={() => this.percentage()}
          />
          <Button
            lightblue
            backgroundColor={
              this.state.operation === "division" ? "white" : "#6272a4"
            }
            color={this.state.operation === "division" ? "#6272a4" : "white"}
            text="÷"
            function={() => this.activateOperation("division")}
          />
        </View>
        <View style={styles.row}>
          <Button
            backgroundColor="#44475A"
            color="white"
            text="7"
            function={() => this.concatenateDigit("7")}
          />
          <Button
            backgroundColor="#44475A"
            color="white"
            text="8"
            function={() => this.concatenateDigit("8")}
          />
          <Button
            backgroundColor="#44475A"
            color="white"
            text="9"
            function={() => this.concatenateDigit("9")}
          />
          <Button
            lightblue
            backgroundColor={
              this.state.operation === "multiplication" ? "white" : "#6272a4"
            }
            function={() => this.activateOperation("multiplication")}
          >
            <Feather
              name="x"
              size={25}
              color={
                this.state.operation === "multiplication" ? "#6272a4" : "white"
              }
              style={styles.icon}
            />
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            backgroundColor="#44475A"
            color="white"
            text="4"
            function={() => this.concatenateDigit("4")}
          />
          <Button
            backgroundColor="#44475A"
            color="white"
            text="5"
            function={() => this.concatenateDigit("5")}
          />
          <Button
            backgroundColor="#44475A"
            color="white"
            text="6"
            function={() => this.concatenateDigit("6")}
          />
          <Button
            lightblue
            backgroundColor={
              this.state.operation === "subtraction" ? "white" : "#6272a4"
            }
            function={() => this.activateOperation("subtraction")}
          >
            <Feather
              name="minus"
              size={25}
              color={
                this.state.operation === "subtraction" ? "#6272a4" : "white"
              }
              style={styles.icon}
            />
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            backgroundColor="#44475A"
            color="white"
            text="1"
            function={() => this.concatenateDigit("1")}
          />
          <Button
            backgroundColor="#44475A"
            color="white"
            text="2"
            function={() => this.concatenateDigit("2")}
          />
          <Button
            backgroundColor="#44475A"
            color="white"
            text="3"
            function={() => this.concatenateDigit("3")}
          />
          <Button
            lightblue
            backgroundColor={
              this.state.operation === "addition" ? "white" : "#6272a4"
            }
            function={() => this.activateOperation("addition")}
          >
            <Feather
              name="plus"
              size={25}
              color={this.state.operation === "addition" ? "#6272a4" : "white"}
              style={styles.icon}
            />
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            special
            backgroundColor="#44475A"
            color="white"
            text="0"
            function={() => this.concatenateDigit("0")}
          />
          <Button
            backgroundColor="#44475A"
            color="white"
            text="."
            function={() => this.addDot()}
          />
          <Button
            lightblue
            backgroundColor="#6272a4"
            color="white"
            text="="
            function={() => this.generateResult()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "black",
    padding: 8,
    paddingBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
    marginBottom: 7,
  },
  icon: {
    textAlign: "center",
  },
});
