import {model, property} from '@loopback/repository';
import {Role} from './role.model';
import {User} from './user.model';

@model()
export class UserWithRole extends User {
  @property({
    type: Role,
    required: true,
  })
  role: Role;
}
