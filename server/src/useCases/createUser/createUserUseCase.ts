import { client } from "../../prisma/client";
import {hash} from "bcryptjs"

interface IUserRequest{
  name: string;
  username: string;
  email: string;
  password: string;
}

class createUserUseCase{
  async handle({ name, username, email, password } : IUserRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        OR: [
          {
            name
          },
          {
            email
          }
        ]
      }
    });

    if (userAlreadyExists) {
      throw new Error(`O email ou username ja foram usados!`);
    }
    
    const encryptedPassword = await hash(password, 10);
    
    const user = await client.user.create({
      data: {
        name,
        username,
        email,
        password: encryptedPassword
      }
    });

    return user;
  }
}

export { createUserUseCase };