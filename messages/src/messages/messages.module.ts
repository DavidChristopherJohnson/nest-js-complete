import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository]
})
export class MessagesModule { }
