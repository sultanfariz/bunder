// import { Request, Response } from 'express';
// import * as userRepo from '../infrastructure/repository/prisma/user/repository';
// import {
//   response,
//   exceptionResponse,
// } from '../infrastructure/commons/response';

// const getUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await userRepo.getUsers();

//     return response(res, {
//       code: 200,
//       success: true,
//       message: 'Successfully get users!',
//       content: users,
//     });
//   } catch (error: any) {
//     return exceptionResponse(res, error);
//   }
// };

// export { getUsers };
