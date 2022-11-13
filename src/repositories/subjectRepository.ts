import { AppDataSource } from "../AppDataSource";
import { Subject } from "../entities/Subject";

export const subjectRepository = AppDataSource.getRepository(Subject);
