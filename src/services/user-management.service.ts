import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {PasswordHasher} from '.';
import {PasswordHasherBindings} from '../keys';
import {UserRepository} from '../repositories';

export class UserManagementService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {}

  async verifyCredentials(credentials: {
    password: string;
    username: string;
  }): Promise<any> {
    const {username, password} = credentials;
    const invalidCredentialsError = 'Invalid username or password.';
    if (!username) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const foundUser = await this.userRepository.findOne({
      where: {username},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await this.passwordHasher.comparePassword(
      password,
      foundUser.password ?? '',
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const userRole = await this.userRepository.role(foundUser.id);
    return {...foundUser, role: userRole};
  }
}
