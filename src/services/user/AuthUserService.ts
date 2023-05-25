import { compare } from "bcryptjs";
import { prisma } from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Verify that email is registered
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email not found");
    }

    // Verify that password is correct
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    // Token JWT
    const token = sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}
