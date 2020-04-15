/*
 * perceptron.h
 * Copyright (C) 2020 Bhavin Prajapati <bhavin.prajapati@gmail.com>
 *
 * Distributed under terms of the LGPL license.
 */

#ifndef PERCEPTRON_H
#define PERCEPTRON_H

typedef struct Perceptron_struct Perceptron;
struct Perceptron_struct
{
    double input[100][100];
    double actualOutput[10];
    double weights[100];
    double bias;
    int epochs;
};

#endif /* !PERCEPTRON_H */
