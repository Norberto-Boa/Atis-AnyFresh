import { client } from "../../prisma/client";
import { generateRefreshToken } from "../../provider/generateRefreshToken";
import { generateToken } from "../../provider/generateTokenProvider";
import { isAfter, getUnixTime, isBefore } from 'date-fns';


class refreshTokenUserUseCase{
  async handle(userId: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        userId
      },
      include: {
        user: true
      }
    });

    if (!refreshToken) {
      throw new Error("RefreshToken not found")
    };

    const refreshTokenExpired = isBefore(getUnixTime(new Date()), refreshToken.expiresIn);

    if (!refreshToken.user.name) { 
      throw new Error(`User not found!`)
    }

    const generateTokenProvider = new generateToken();
    const token = await generateTokenProvider.handle(refreshToken.userId, refreshToken.user.name);

    if (refreshTokenExpired) {
      return {message: "login", };
    }
    
    const GenerateRefreshToken = new generateRefreshToken();
    const refresh_Token = await GenerateRefreshToken.handle(refreshToken.userId);

    return { token, refresh_Token};
  }
}

export { refreshTokenUserUseCase };