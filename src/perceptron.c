/*
 * perceptron.c
 * Copyright (C) 2020 Bhavin Prajapati <bhavin.prajapati@gmail.com>
 *
 * Distributed under terms of the LGPL license.
 */
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "perceptron.h"

//Dot Product of Two Vectors of same size
double dotProduct(double v1[], double v2[])
{
	double dot = 0;
	for (int i = 0; i < sizeof(v1); i++)
	{
		dot += v1[i] * v2[i];
	}
	return dot;
}

//Addition of Two Vectors of same size
double *vecAdd(double v1[], double v2[])
{
	double add[sizeof(v1)];
	for (int i = 0; i < sizeof(v1); i++)
	{
		add[i] += v1[i] + v2[i];
	}
	return &add;
}

//Multiplication of a Vector & Matrix
double *scalarMatMul(double s, double mat[])
{
	double result[sizeof(mat)];
	for (int i = 0; i < sizeof(mat); i++)
	{
		result[i] += s * mat[i];
	}
	return result;
}

//Random Initialization
void initialize(Perceptron *perceptron)
{
	(*perceptron).bias = 0.0;
	for (int i = 0; i < sizeof((*perceptron).input[0]); i++)
	{
		(*perceptron).weights[i] += rand();
	}
}

//Sigmoid Activation
double sigmoid(double x)
{
	return 1.0 / (1.0 + exp(-x));
}

//Forward Propagation
double forwardPass(Perceptron *perceptron, double x[])
{
	return sigmoid(dotProduct((*perceptron).weights, x) + (*perceptron).bias);
}

//Calculate Gradients of Weights
double *gradW(Perceptron *perceptron, double x[], double y)
{
	double pred = forwardPass(perceptron, x);
	return scalarMatMul(-(pred - y) * pred * (1 - pred), x);
}

//Calculate Gradients of Bias
double gradB(Perceptron *perceptron, double x[], double y)
{
	double pred = forwardPass(perceptron, x);
	return -(pred - y) * pred * (1 - pred);
}

//Train the Perceptron for n epochs
void train(Perceptron *perceptron)
{
	for (int i = 0; i < (*perceptron).epochs; i++)
	{
		double dw[sizeof((*perceptron).input[0])];
		double db = 0;
		int length = sizeof((*perceptron).input);
		for (int j = 0; j < length; j++)
		{
			memcpy(dw, vecAdd(dw, gradW(perceptron, (*perceptron).input[j], (*perceptron).actualOutput[j])), sizeof dw);
			//dw = vecAdd(dw, gradW(perceptron, (*perceptron).input[j], (*perceptron).actualOutput[j]));
			db += gradB(perceptron, (*perceptron).input[j], (*perceptron).actualOutput[j]);
		}
		memcpy(dw, scalarMatMul(2 / (double)(sizeof((*perceptron).actualOutput)), dw), sizeof dw);
		//dw = scalarMatMul(2 / (double)(sizeof((*perceptron).actualOutput)), dw);
		memcpy((*perceptron).weights, vecAdd((*perceptron).weights, dw), sizeof(*perceptron).weights);
		//(*perceptron).weights = vecAdd((*perceptron).weights, dw);
		(*perceptron).bias += db * 2 / (double)(sizeof((*perceptron).actualOutput));
	}
}