const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


// const clave = 'hola12345';

// const claveHasheada = "$2a$10$9UmjNneX/btXWKecme7a9uO3JfAHeLHbRWwuxdh25xWmNhkMmfSNe";

// bcrypt.compare(clave, claveHasheada).then(boolean => console.log(boolean))


// const hashearClave = async (clave) => {
//   const claveHasheada = await bcrypt.hash(clave, 10);
//   return claveHasheada
// }

// hashearClave(clave).then(hash => console.log(hash))


// const firma = 'holaa';
// const payload = {username: 'rama'}

// const token = jwt.sign(payload, firma, { expiresIn: '1h' });

// function avergaston (token, firma) {
//   try {
//     const user = jwt.verify(token, firma);
//     console.log(user)
//   } catch (error) {
//     console.log(error instanceof Error);
//     console.log(error.message)
//     if (error.message === 'invalid signature') console.log('jajajajaaj')
//   }
// }
// avergaston(token, 'caca');




