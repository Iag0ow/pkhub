import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/global/enums/role.enum';
import { ROLES_KEY } from 'src/global/constants/roles.constants';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
