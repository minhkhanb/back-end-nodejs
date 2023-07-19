import rolesPermissions from './rolesPermission.json';

interface RolePermission {
  path: string;
  permission: {
    Admin: boolean,
    Tester: boolean,
    Employee: boolean,
  };
}

interface RoleConfig {
  portalDashboard: RolePermission;
}

export enum UserRole {
  Admin = 'Admin',
  Tester = 'Tester',
  Employee = 'Employee',
}

export { RolePermission, RoleConfig, rolesPermissions };
