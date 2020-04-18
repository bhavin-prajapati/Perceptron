export class FeedForward {
  constructor(inputData, outputData, epochs) {
    this.inputData = inputData;
    this.outputData = outputData;
    this.weights = [];
    this.bias = 0.0;
    this.epochs = epochs;
  }

  //Random Initialization
  initialize() {
    this.weights = new Array(this.inputData[0].length);
    this.bias = 0.0;
    for (let i = 0; i < this.inputData[0].length; i++) {
      this.weights[i] = Math.random();
    }
  }

  //Sigmoid Activation
  sigmoid(x) {
    return 1.0 / (1.0 + Math.exp(-x));
  }

  //Linear Algebra Functions
  dotProduct = (v1, v2) => {
    let dot = 0;
    for (let i = 0; i < v1.length; i++) {
      dot += v1[i] * v2[i];
    }
    return dot;
  };

  addVectors = (v1, v2) => {
    let add = Array(v1.length);
    for (let i = 0; i < add.length; i++) {
      add[i] = 0;
    }
    for (let i = 0; i < v1.length; i++) {
      add[i] = v1[i] + v2[i];
    }
    return add;
  };

  multiplyVector = (s, vec) => {
    let result = Array(vec.length);
    for (let i = 0; i < result.length; i++) {
      result[i] = 0;
    }
    for (let i = 0; i < vec.length; i++) {
      result[i] = s * vec[i];
    }
    return result;
  };

  //Forward Propagation
  forwardPass(x) {
    return this.sigmoid(this.dotProduct(this.weights, x) + this.bias);
  }

  //Calculate Gradients of Weights
  gradW(x, y) {
    let pred = this.forwardPass(x);
    return this.multiplyVector(-(pred - y) * pred * (1 - pred), x);
  }

  //Calculate Gradients of Bias
  gradB(x, y) {
    let pred = this.forwardPass(x);
    return -(pred - y) * pred * (1 - pred);
  }

  //Train the Perceptron for n epochs
  train() {
    for (let i = 0; i < this.epochs; i++) {
      let dw = new Array(this.inputData[0].length);
      for (let j = 0; j < dw.length; j++) {
        dw[j] = 0;
      }
      let db = 0;
      let length = this.inputData.length;
      for (let j = 0; j < length; j++) {
        dw = this.addVectors(
          dw,
          this.gradW(this.inputData[j], this.outputData[j])
        );
        db += this.gradB(this.inputData[j], this.outputData[j]);
      }
      dw = this.multiplyVector(2 / this.outputData.length, dw);
      this.weights = this.addVectors(this.weights, dw);
      this.bias += (db * 2) / this.outputData.length;
    }
  }
}
