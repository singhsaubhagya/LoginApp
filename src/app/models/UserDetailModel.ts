export interface UserDetailModel {
    email: string;
    password: string;
}

export interface UserDetailOutput {
    token: string;
}

export interface UsersOutput {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UserData[];
    support: Suppport;
}

export interface UserData{
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface Suppport{
    url: string;
    text: string;
}