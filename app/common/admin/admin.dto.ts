

export interface IAdmin extends Document {
        name: string;
        email: string;
        active?: boolean;
        role:"ADMIN";
        password: string
}
