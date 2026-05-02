export interface IRedirectUrlUseCase {
  execute(shortCode: string): Promise<string>;
}
