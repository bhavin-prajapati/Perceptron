import { dotProduct, vecAdd, scalarMatMul } from "../util/math";

export class FeedForward {
  constructor(inputData, outputData, weights, bias, epochs) {
    this.inputData = inputData;
    this.outputData = outputData;
    this.weights = weights;
    this.bias = bias;
    this.epochs = epochs;
  }

  //Random Initialization
  initialize() {
    this.bias = 0.0;
    for (let i = 0; i < this.inputData[0].length; i++) {
      this.weights[i] += Math.random();
    }
  }

  //Sigmoid Activation
  sigmoid(x) {
    return 1.0 / (1.0 + Math.exp(-x));
  }

  //Forward Propagation
  forwardPass(x) {
    return this.sigmoid(dotProduct(this.weights, x) + this.bias);
  }

  //Calculate Gradients of Weights
  gradW(x, y) {
    let pred = this.forwardPass(x);
    return scalarMatMul(-(pred - y) * pred * (1 - pred), x);
  }

  //Calculate Gradients of Bias
  gradB(x, y) {
    let pred = this.forwardPass(x);
    return -(pred - y) * pred * (1 - pred);
  }

  //Train the Perceptron for n epochs
  train() {
    for (let i = 0; i < this.epochs; i++) {
      let dw = [];
      let db = 0;
      let length = this.inputData.length;
      for (let j = 0; j < length; j++) {
        dw = vecAdd(dw, this.gradW(this.inputData[j], this.outputData[j]));
        db += this.gradB(this.inputData[j], this.outputData[j]);
      }
      dw = scalarMatMul(2 / this.outputData.length, dw);
      this.weights = vecAdd(this.weights, dw);
      this.bias += (db * 2) / this.outputData.length;
    }
  }
}
