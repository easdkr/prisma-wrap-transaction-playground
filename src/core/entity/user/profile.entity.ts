import { UNSET_DATE, UNSET_ID } from 'src/core/common/constant';

export class Profile {
  #id: number;
  #image: string;
  #bio: string;
  #userId: number;
  #createdAt: Date;
  #updatedAt: Date;
  #deletedAt: Date | null;

  public constructor(
    id: number,
    image: string,
    bio: string,
    userId: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,
  ) {
    this.#id = id;
    this.#image = image;
    this.#bio = bio;
    this.#userId = userId;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#deletedAt = deletedAt;
  }

  public static of(args: {
    image: string;
    bio: string;
    userId: number;
  }): Profile {
    return new Profile(
      UNSET_ID,
      args.image,
      args.bio,
      args.userId,
      UNSET_DATE,
      UNSET_DATE,
      null,
    );
  }

  public static from(args: {
    id: number;
    image: string;
    bio: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }): Profile {
    return new Profile(
      args.id,
      args.image,
      args.bio,
      args.userId,
      args.createdAt,
      args.updatedAt,
      args.deletedAt,
    );
  }

  public get id(): number {
    if (this.#id === UNSET_ID) {
      throw new Error('The id has not been set.');
    }
    return this.#id;
  }

  public get image(): string {
    return this.#image;
  }

  public get bio(): string {
    return this.#bio;
  }

  public get userId(): number {
    return this.#userId;
  }

  public get createdAt(): Date {
    if (this.#createdAt === UNSET_DATE) {
      throw new Error('The createdAt has not been set.');
    }

    return this.#createdAt;
  }

  public get updatedAt(): Date {
    if (this.#updatedAt === UNSET_DATE) {
      throw new Error('The updatedAt has not been set.');
    }

    return this.#updatedAt;
  }

  public get deletedAt(): Date | null {
    return this.#deletedAt;
  }
}
