import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages(){
        return ['message 1', 'message 2'];
    }

    @Get('/:id')
    getMessage() {
        return 'message 1'
    }

    @Post()
    createMessage(){
        return '';
    }
}
