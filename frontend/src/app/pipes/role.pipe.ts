import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../models';

type RoleDictionary = { [K in Role]: string };

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  readonly ROLE_TO_TEXT: RoleDictionary = {
    [Role.USER]: 'User',
    [Role.ADMIN]: 'Admin',
  };

  transform(value: Role): string {
    return this.ROLE_TO_TEXT[value] ?? 'Unknown';
  }

}
