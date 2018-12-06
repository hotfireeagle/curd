import { IsNotEmpty, IsString, MinLength } from 'class-validator';

class UserDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    public password: string;
}

export {
    UserDto
}