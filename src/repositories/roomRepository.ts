import { AppDataSource } from "../AppDataSource";
import { Room } from "../entities/Room";

export const roomRepository = AppDataSource.getRepository(Room);