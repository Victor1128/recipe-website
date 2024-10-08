export class UserModel {

  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
  ) {
  }

  get token(): string {
    if (!this._tokenExpirationDate || this._tokenExpirationDate < new Date())
      return null;
    return this._token;
  }

}
