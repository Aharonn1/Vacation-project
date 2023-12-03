import RoleModel from "./Role-Model";
class UserModel {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: RoleModel;
}

export default UserModel