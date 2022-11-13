import { AppDataSource } from "../AppDataSource";
import { Video } from "../entities/Video";

export const videoRepository = AppDataSource.getRepository(Video);