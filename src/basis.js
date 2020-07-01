const {matrix, det : determinant} = require('mathjs');
const {randArr, randIntArr} = require('./random');
const {map} = require('ramda');
const {emptyArray} = require('./array');


const generateBasis = type => (n,min=-100, max=100) => {
    const randGen = {
        'int' : randIntArr,
        'float' : randArr
    }[type];
    const vectors = map(()=>randGen(n,min,max),emptyArray(n));
    const basis = matrix(vectors);
    if(determinant(basis) !== 0) return basis;
    else return generateBasis(type)(n,min,max);
};

const genIntBasis = generateBasis('int');
const genFloatBasis = generateBasis('float');

module.exports = {
    generateBasis, genIntBasis, genFloatBasis
};
