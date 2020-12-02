import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface ExpenseEntity extends InMemoryDBEntity {
    paidBy: string; // ref - user id
    amount: number;
    splitType: string; // enum - exact, percent
    splitConfig: object; // { userId: amount }
    createdAt: string;
}