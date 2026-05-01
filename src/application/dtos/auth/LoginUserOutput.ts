export interface LoginUserOutput {
  readonly accessToken: string;
  readonly user: {
    readonly id: string;
    readonly email: string;
  };
}
