interface ICreateUserDTO {
    id?: number;
    name: string;
    email: string;
    avatar?: string;
    password: string;
}

export { ICreateUserDTO }