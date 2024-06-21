import { SetMetadata } from "@nestjs/common";
import { Role } from "src/enums/role.enum";
import { ROLES_KEY } from "src/constants/roles.constants";


export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);