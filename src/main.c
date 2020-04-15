/*
 * main.c
 * Copyright (C) 2020 Bhavin Prajapati <bhavin.prajapati@gmail.com>
 *
 * Distributed under terms of the LGPL license.
 */

#include "perceptron.h"

int main(int argc, char **argv)
{
	printf("Perceptron\n");
	Perceptron perceprton = {
		.input = {{0, 0, 1}, {1, 1, 1}, {1, 0, 1}, {0, 1, 0}},
		.actualOutput = {0, 1, 1, 0},
		.epochs = 1000,
	};

	initialize(&perceprton);
	train(&perceprton);

	//Make Predictions
	double layer1[] = {0, 1, 0};
	double layer2[] = {0, 1, 0};

	printf(forwardPass(&perceprton, layer1));
	printf(forwardPass(&perceprton, layer2));
	return 0;
}
