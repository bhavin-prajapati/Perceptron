//Dot Product of Two Vectors of same size
export const dotProduct = (v1, v2) => {
  let dot = 0;
  for (let i = 0; i < v1.length; i++) {
    dot += v1[i] * v2[i];
  }
  return dot;
};

//Addition of Two Vectors of same size
export const vecAdd = (v1, v2) => {
  let add = Array(v1.length);
  for (let i = 0; i < v1.length; i++) {
    add[i] = v1[i] + v2[i];
  }
  return add;
};

//Multiplication of a Vector & Matrix
export const scalarMatMul = (s, mat) => {
  let result = Array(mat.length);
  for (let i = 0; i < mat.length; i++) {
    result[i] += s * mat[i];
  }
  return result;
};
