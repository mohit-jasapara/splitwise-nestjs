import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface UserEntity extends InMemoryDBEntity {
    name: string;
    value: number;
    admin: boolean;
}