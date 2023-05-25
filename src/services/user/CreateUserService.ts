import { prisma } from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    // Verify that the email is valid
    if (!email) {
      throw new Error("Email is required");
    }

    // Verify that email is registered
    const userAlreadyRegistered = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyRegistered) {
      throw new Error("Email is already registered");
    }

    // Cryptografy the password
    const passwordHash = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
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
