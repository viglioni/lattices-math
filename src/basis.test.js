const {genIntBasis} = require('./basis.js');
const {det: determinant, size} = require('mathjs');
const {equals} = require('ramda');

test('should return a 100x100 non-singular matrix',()=>{
    const basis = genIntBasis(100);
    expect(determinant(basis)).not.toBe(0);
    expect(equals(size(basis)._data , [100,100])).toBeTruthy();
});
