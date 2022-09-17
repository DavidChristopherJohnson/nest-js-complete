import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    messagesService: MessagesService;

    constructor() {

        //DON't DO THIS ON REAL APP. USE DI
        this.messagesService = new MessagesService();
    }

    @Get()
    listMessages() {
        return this.messagesService.findAll();
    }

    @Get('/:id')
    async getMessage(
        @Param('id') id: string
    ) {
        const message = await this.messagesService.findOne(id);

        console.log(message);

        if (!message)
            throw new NotFoundException('message not found');

        return message
    }

    @Post()
    createMessage(
        @Body() body: CreateMessageDto
    ) {
        return this.messagesService.create(body.content);
    }
}
