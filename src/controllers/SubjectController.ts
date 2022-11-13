import { Request, Response } from "express";
import { subjectRepository } from "../repositories/subjectRepository";

export class SubjectController {

  public async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Nome da disciplina não informado.' });
    }

    try {
      const newSubject = subjectRepository.create({ name });
      await subjectRepository.save(newSubject);
      return res.status(201).json(newSubject);

    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }
}
