import { Request, Response } from "express";
import { z } from "zod";
import { authenticateUserUseCase } from "./authenticateUserUseCase";

class authenticateUserController{
  async login(req: Request, res: Response) {
    
    const authBody = z.object({
      username: z.string().trim(),
      password: z.string()
    }).parse(req.body);


    const { username, password } = authBody;

    const authenticate = new authenticateUserUseCase();

    const token = await authenticate.handle({
      username,
      password
    });

    return res.status(200).json(token);
  }
}

export { authenticateUserController };