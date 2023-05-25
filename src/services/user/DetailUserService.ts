import { prisma } from "../../prisma";

export class DetailUserService {
  async execute(user_id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }
}
