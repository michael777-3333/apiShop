// module.exports = {
//     routes: [
//       {
//         method: 'POST',
//         path: '/api/token',
//         handler: 'token.verifyToken',
//         config: {
//           auth: false,
//           preHandler: ['token.extractTokenFromHeader'] // Middleware para extraer el token
//         },
//       },
//     ],
  
//     async verifyToken(ctx) {
//       try {
//         console.log('Token:', ctx.state.token); // Accede al token desde el contexto
//         console.log('Token verificado correctamente');
//       } catch (error) {
//         console.log('Error al verificar el token:', error);   
//       }
//     },
  
//     async extractTokenFromHeader(ctx, next) {
//       try {
//         const token = ctx.request.headers.authorization; // Lee el token de los encabezados
//         if (!token) {
//           throw new Error('Token no proporcionado en los encabezados');
//         }
//         // Pasa el token al estado del contexto para que esté disponible en el controlador
//         ctx.state.token = token;
//         await next();
//       } catch (error) {
//         console.log('Error al extraer el token:', error);
//         ctx.throw(401, 'No autorizado');
//       }
//     }
//   };
  