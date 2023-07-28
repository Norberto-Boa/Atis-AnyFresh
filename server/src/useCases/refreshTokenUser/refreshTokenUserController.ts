import { Request, Response } from "express";
import { refreshTokenUserUseCase } from "./refreshTokenUserUseCase";


class refreshTokenUserController{
  async refresh(req: Request, res: Response) {
    const { id } = req.params;
    
    const refreshToken = new refreshTokenUserUseCase();

    const token = await refreshToken.handle(id);

    return res.json(token);
  }
}

export { refreshTokenUserController };