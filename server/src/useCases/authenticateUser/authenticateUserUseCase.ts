import { client } from "../../prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { generateRefreshToken } from "../../provider/generateRefreshToken";
import { generateToken } from "../../provider/generateTokenProvider";

interface IRequest{
  username?: string;
  password: string;
  email?: string;
}

class authenticateUserUseCase{
  async handle({ username, password, email }: IRequest) {
    
    // Check if user exists
    const userAlreadyExists = await client.user.findFirst({
      where: {
        OR: [
          {
            username
          },
          {
            email
          }
        ]
      }
    });

    if (!userAlreadyExists) {
      throw new Error('As suas credenciais estao erradas!')
    }

    //Verificando a senha
    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) { 
      throw new Error('As suas credenciais estao erradas!');
    }

    // Verificar existencia de refresh Token

    //gerar o token do usuario
    const generateTokenProvider = new generateToken();
    const token = await generateTokenProvider.handle(userAlreadyExists.id, userAlreadyExists.name);

    const GenerateRefreshToken = new generateRefreshToken();

    const refreshToken = await GenerateRefreshToken.handle(userAlreadyExists.id);

    return { token, refreshToken};
  }
  
}

export { authenticateUserUseCase };