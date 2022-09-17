import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages() {
        return ['message 1', 'message 2'];
    }

    @Get('/:id')
    getMessage(
        @Param('id') id: string
    ) {
        console.log(id);
        return id;
    }

    @Post()
    createMessage(
        @Body() body: CreateMessageDto
    ) {
        console.log(body);
        return body;
    }
}
