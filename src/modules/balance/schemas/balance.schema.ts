import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface BalanceEntity extends InMemoryDBEntity {
    payUserId: string;
    oweUserId: string;
    balance: number;
    updatedAt: string;
}