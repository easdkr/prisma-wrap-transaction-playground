import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateUserUsecaseArgs } from 'src/core/usecase/user';

export class CreateUserRequest {
  @IsEmail()
  public email: string;

  @IsString()
  public name: string;

  @IsString()
  public password: string;

  @IsOptional()
  @IsString()
  public image?: string;

  @IsOptional()
  @IsString()
  public bio?: string;

  @Exclude()
  public toUsecaseArgs(): CreateUserUsecaseArgs {
    return {
      email: this.email,
      name: this.name,
      password: this.password,
      image: this.image || 'default-profile-image.png',
      bio: this.bio || '',
    };
  }
}
