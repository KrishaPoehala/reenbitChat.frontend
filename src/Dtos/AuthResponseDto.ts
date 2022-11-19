
export interface AuthRepsonseDto{
    isAuthSuccessfull : boolean,
    errorMessage: string | null,
    token: string | null,
}