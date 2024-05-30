import { UNSET_DATE, UNSET_ID } from '../../common/constant';

export class User {
  #id: number;
  #name: string;
  #email: string;
  #password: string;
  #createdAt: Date;
  #updatedAt: Date;
  #deletedAt: Date | null;

  public constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,
  ) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#password = password;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#deletedAt = deletedAt;
  }

  public static of(args: {
    name: string;
    email: string;
    password: string;
  }): User {
    return new User(
      UNSET_ID,
      args.name,
      args.email,
      args.password,
      UNSET_DATE,
      UNSET_DATE,
      null,
    );
  }

  public static from(args: {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }): User {
    return new User(
      args.id,
      args.name,
      args.email,
      args.password,
      args.createdAt,
      args.updatedAt,
      args.deletedAt,
    );
  }

  public get id(): number {
    if (this.#id === UNSET_ID) {
      throw new Error('The id is not set yet');
    }

    return this.#id;
  }

  public get name(): string {
    return this.#name;
  }

  public get email(): string {
    return this.#email;
  }

  public get password(): string {
    return this.#password;
  }

  public get createdAt(): Date {
    return this.#createdAt;
  }

  public get updatedAt(): Date {
    return this.#updatedAt;
  }

  public get deletedAt(): Date | null {
    return this.#deletedAt;
  }
}
