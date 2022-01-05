import {BindingKey} from '@loopback/context';
import {PasswordHasher} from './services';

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER =
    BindingKey.create<PasswordHasher>('services.hasher');
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<any>('services.user.service');
}
export namespace TokenServiceBindings {
  export const TOKEN_SERVICE = BindingKey.create<any>('services.token.service');
}
