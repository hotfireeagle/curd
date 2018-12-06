import { Controller, Get, Request } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    findById(@Request() req) {
        return 'all cats';
    }
}