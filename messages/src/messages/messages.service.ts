import { MessagesRepository } from "./messages.repository";

export class MessagesService 
{
    messagesRepo: MessagesRepository;

    constructor() {
        //Services is creating its own dependencies
        //NOT TO BE DONE ON REAL APPS.
        //TEMPORARY
        this.messagesRepo = new MessagesRepository();
    }

    findOne( id: string ) {
        return this.messagesRepo.findOne(id);
    }

    findAll() {
        return  this.messagesRepo.findAll();
    }

    create(content: string) {
        return this.messagesRepo.create(content);
    }
}