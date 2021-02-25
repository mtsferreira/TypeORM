import { Request, response, Response } from 'express'
import { getCustomRepository, Repository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const surveysRepository = getCustomRepository(SurveysRepository);

        const survey = surveysRepository.create({
            title, 
            description
        });

        await surveysRepository.save(survey);

        return response.status(201).json(survey)
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository);

        const all = await surveysRepository.find();

        return response.json(all);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const surveysRepository = getCustomRepository(SurveysRepository);

        const all = await surveysRepository.find();

        const surveyToRemove = await surveysRepository.findOne({id});

        await surveysRepository.remove(surveyToRemove);

        return response.json({message: "Survey deleted!"});
    }

}

export { SurveysController }