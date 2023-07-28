import { Request, Response } from "express";
import { z } from "zod";
import { createUserUseCase } from "./createUserUseCase";


class createUserController{
  async create(req: Request, res: Response) {
    
    const userBody = z.object({
      name: z.string().min(3, {message: "O nome deve ter pelo menos 3 caracteres!"}),
      username: z.string().min(3, { message: "O nome do usuario deve ter no minimo 3 caracteres!" }),
      email: z.string().email(),
      password: z.string().min(8, { message: "Palavra passe deve ter pelo menos 8 caracteres!" })
    }).parse(req.body);

    const { name, username, email, password } = userBody;
    
    const createUser = new createUserUseCase()

    const user = await createUser.handle({
      name,
      username,
      email,
      password
    });

    return res.status(200).json(user);
  }
}

export { createUserController };