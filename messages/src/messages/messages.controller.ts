import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    messagesService: MessagesService;

    constructor(){

        //DON't DO THIS ON REAL APP. USE DI
        this.messagesService = new MessagesService();
    }

    @Get()
    listMessages() {
        return this.messagesService.findAll();
    }

    @Get('/:id')
    getMessage(
        @Param('id') id: string
    ) {
        return this.messagesService.findOne(id);
    }

    @Post()
    createMessage(
        @Body() body: CreateMessageDto
    ) {
        return this.messagesService.create(body.content);
    }
}
