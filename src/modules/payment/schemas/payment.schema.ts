import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface ModelEntity extends InMemoryDBEntity {
    fromUserId: string;
    toUserId: string;
    amount: number;
    createdAt: string;
}