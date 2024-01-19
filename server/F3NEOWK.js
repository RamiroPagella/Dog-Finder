const bcrypt = require('bcryptjs')

const clave = 'hola12345';

const claveHasheada = "$2a$10$9UmjNneX/btXWKecme7a9uO3JfAHeLHbRWwuxdh25xWmNhkMmfSNe";

bcrypt.compare(clave, claveHasheada).then(boolean => console.log(boolean))


// const hashearClave = async (clave) => {
//   const claveHasheada = await bcrypt.hash(clave, 10);
//   return claveHasheada
// }

// hashearClave(clave).then(hash => console.log(hash))



