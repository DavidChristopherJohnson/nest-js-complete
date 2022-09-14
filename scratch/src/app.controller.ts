import { Controller, Get } from "@nestjs/common";

//Decorate the class as a controller
@Controller('/app')
export class AppController {
    @Get('/asdf')
    getRootRoute() {
        return 'Hello World';
    }

    @Get('/bye')
    getByThere() {
        return 'Bye there'
    }
}

