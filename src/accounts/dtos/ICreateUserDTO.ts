interface ICreateUserDTO {
    id?: number;
    name: string;
    email: string;
    avatar: string | null;
    password?: string | null;
}

export { ICreateUserDTO }