import { PrismaClient } from '@prisma/client';
import type { UmiApiRequest, UmiApiResponse } from 'umi';
import bcrypt from 'bcryptjs';
import { signToken } from 'utils/jwt';

export default async (req: UmiApiRequest, res: UmiApiResponse) => {
  switch (req.method) {
    case 'POST':
      try {
        const prisma = new PrismaClient();

        const user = await prisma.user.create({
          data: {
            email: req.body.email,

            passwordHash: bcrypt.hashSync(req.body.password, 8),
            name: req.body.name,
            avatarUrl: req.body.avatarUrl,
          },
        });

        res
          .status(201)
          .setCookie('token', await signToken(user.id))
          .json({ ...user, passwordHash: undefined });

        await prisma.$disconnect();
      } catch (err: any) {
        res.status(500).json({
          result: false,
          message:
            typeof err.code === 'string'
              ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' +
                err.code.toLowerCase()
              : err,
        });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
};
