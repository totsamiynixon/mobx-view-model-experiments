import * as mobx from "mobx";
import { faker } from "@faker-js/faker";
import { MobxObservable, MobxObservableArray } from "../types";

export type User = {
  readonly id: MobxObservable<string>;
  readonly name: MobxObservable<string>;
};

class Users {
  public static readonly UserIds: string[] = [];

  @mobx.observable
  private _users: MobxObservableArray<User>;

  constructor() {
    this._users = [];

    mobx.makeAutoObservable(this);
  }

  @mobx.computed
  get users(): Readonly<MobxObservableArray<User>> {
    return this._users;
  }

  @mobx.action
  addNextUser(): void {
    const id = `user_${this._users.length + 1}_${Date.now().toString()}`;
    this._users.push({
      id: id,
      name: faker.name.fullName(),
    });
    Users.UserIds.push(id);
  }

  @mobx.action
  deleteUser(user: User): void {
    this._users.splice(this.users.indexOf(user), 1);
    Users.UserIds.splice(Users.UserIds.indexOf(user.id), 1);
  }
}

export default Users;
