import * as mobx from "mobx";
import { MobxObservable } from "../types";

export type AuthUser = {
  readonly id: MobxObservable<string>;
  readonly displayName: MobxObservable<string>;
};

class Auth {
  // to simplify tests
  public static readonly CurrentUserId = "current_user";

  private _currentUser: MobxObservable<AuthUser> = {
    id: Auth.CurrentUserId,
    displayName: "My name",
  };

  constructor() {
    mobx.makeAutoObservable(this);
  }

  get currentUser(): MobxObservable<AuthUser> {
    return this._currentUser;
  }
}

export default Auth;
