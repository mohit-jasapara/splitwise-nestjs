import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface ModelEntity extends InMemoryDBEntity {
    name: string;
    value: number;
    admin: boolean;
}