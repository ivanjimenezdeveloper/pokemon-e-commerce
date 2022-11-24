import { IUser } from 'src/app/models/user.model';

export class SetLoggedUser {
  static readonly type = '[user] set logged user';
  constructor(public user: IUser) {}
}

export class setLogOut {
  static readonly type = '[user] log out user';
  constructor() {}
}
