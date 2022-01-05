import {HttpErrors} from '@loopback/rest';
import {promisify} from 'util';
import {UserWithRole} from '../models';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);

export class JWTService {
  constructor() {}

  async generateToken(userProfile: UserWithRole): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null',
      );
    }
    const userInfoForToken = {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      userId: userProfile.id,
      role: userProfile.role,
    };
    // Generate a JSON Web Token
    let token: string;
    try {
      token = await signAsync(userInfoForToken, process.env.JWT_SECRET, {
        expiresIn: Number(process.env.JWT_EXPIRESIN),
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }

    return token;
  }
}
