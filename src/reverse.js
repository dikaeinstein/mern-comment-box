const reverseString = (str) => {
  let reversedString = '';
  for (let i = str.length - 1; i >= 0 ; i--) {
    reversedString += str[i];
  }
  return reversedString;
};

// function reverseString(str) {
//   var reversedString = '';
//   for (let i = str.length - 1; i >= 0 ; i--) {
//     reversedString += str[i];
//   }
//   return reversedString;
// }
console.log(reverseString('abc'));

// var arr = [1, 2, 3, 4];

// var arr2 = arr.map(function(x) {
//   return x * x;
// });
