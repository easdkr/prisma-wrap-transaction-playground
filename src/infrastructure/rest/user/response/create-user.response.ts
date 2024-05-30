import { User } from 'src/core/entity/user';

export class CreateUserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromEntity(user: User): CreateUserResponse {
    return new CreateUserResponse(
      user.id,
      user.name,
      user.email,
      user.createdAt,
      user.updatedAt,
    );
  }
}
