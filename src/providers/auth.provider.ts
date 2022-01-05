import {Provider} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {VerifyFunction} from 'loopback4-authentication';
import {User} from '../models/user.model';
import {RevokedTokenRepository} from '../repositories';
const jwt = require('jsonwebtoken');
const {verify} = jwt;
export class BearerTokenVerifyProvider
  implements Provider<VerifyFunction.BearerFn>
{
  constructor(
    @repository(RevokedTokenRepository)
    public revokedTokenRepository: RevokedTokenRepository,
  ) {}

  value(): VerifyFunction.BearerFn {
    return async token => {
      if (token && (await this.revokedTokenRepository.get(token))) {
        throw new HttpErrors.Unauthorized('Token Revoked');
      }
      const user = verify(token, process.env.JWT_SECRET as string) as User;
      return user;
    };
  }
}
