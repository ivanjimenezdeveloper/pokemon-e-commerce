import { IUser } from './../../models/user.model';
import { SetLoggedUser, setLogOut } from './user.action';
import { Action, Selector, State, StateContext } from '@ngxs/store';

@State<IUser>({ name: 'user', defaults: { username: '' } })
export class UserState {
  @Action(SetLoggedUser) SetLoggedUser(
    ctx: StateContext<IUser>,
    { user }: SetLoggedUser
  ) {
    ctx.patchState(user);
  }

  @Action(setLogOut) LogOut(ctx: StateContext<IUser>) {
    ctx.patchState({ username: '' });
  }

  @Selector()
  static getUsername(state: IUser) {
    return state.username;
  }

  @Selector()
  static isLoggedIn(state: IUser) {
    return state.username ? true : false;
  }
}
