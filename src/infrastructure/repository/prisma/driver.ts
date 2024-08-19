import { PrismaClient, Gender, SwipeDirection } from '@prisma/client';
const prisma = new PrismaClient();

export default prisma;
export { Gender, SwipeDirection };
