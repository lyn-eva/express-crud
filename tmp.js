// const composeM =
//   (flatMap) =>
//   (...ms) => {
//     // console.log('ms', ms);
//     return ms.reduce((f, g) => {
//       return (x) => {
//         const tmp = g(x)[flatMap](f);
//         console.log(g(x).then);
//         return tmp;
//       };
//     });
//   };

// const composePromises = composeM('then');

// const label = 'API call composition';

// const trace = (label) => (value) => {
//   console.log(`${label}: ${value}`);
//   return value;
// };

// // a => Promise(b)
// const getUserById = (id) =>
//   id === 3 ? Promise.resolve({ name: 'Kurt', role: 'Author' }) : undefined;

// // b => Promise(c)
// const hasPermission = ({ role }) => Promise.resolve(role === 'Author');

// // Compose the functions (this works!)
// const authUser = composePromises(hasPermission, getUserById);
// // console.log(authUser)
// authUser(3).then(trace(label)); // true

// getUserById(3).then(hasPermission).then(trace(label));

const one = (val) => {
  return {
    sus() {
      console.log('this is sus');
    },
    method: function (n) {
      console.log(n, this);
    },
  };
};

one(56).method(23);
