import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Injectable()
export class MessagesRepository {
    private readonly messageFile = 'messages.json';

    async findOne(id: string) {
        const contents = await this.readFileToJson(this.messageFile);

        return contents[id];
    }

    async findAll() {
        return await this.readFileToJson(this.messageFile);
    }

    async create(content: string) {
        const contents = await this.readFileToJson(this.messageFile);

        const id = Math.floor(Math.random() * 999);
        contents[id] = {
            id,
            content
        };

        await this.writeJsonToFile(this.messageFile, contents);
    }

    private async readFileToJson(fileName: string, encoding: BufferEncoding = 'utf-8') {
        const contents = await readFile(fileName, encoding)
        return JSON.parse(contents);
    }

    private async writeJsonToFile(fileName: string, contents) {
        await writeFile(fileName, JSON.stringify(contents));
    }
}