import { getCustomRepository } from 'typeorm';
import { Request, Response } from "express"
import { SurveysUsersRepository } from '../repositories/SurveysUsersReṕsitory';
import { AppError } from '../errors/AppError';


class AnswerController {

    async execute(request: Request, response: Response){
        const { value } = request.params
        const { u } = request.query

        const surveyUserRepository =  getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveyUserRepository.findOne({
            id: String(u)
        })

        if(!surveyUser){

            throw new AppError('Survey User does not exist!')

            return response.status(400).json({
                error: 'Survey User does not exist!'
            })

        }

        surveyUser.value = Number(value)

        await surveyUserRepository.save(surveyUser)

        return response.status(200).json(surveyUser)
        
    }
}

export { AnswerController }