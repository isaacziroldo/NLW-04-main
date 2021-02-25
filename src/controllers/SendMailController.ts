import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersReṕsitory";
import { UsersRepository } from "../repositories/UsersRepository";


class SendMailController {

    async execute(request: Request, response: Response){
        const { email, survey_id } = request.body

        const userRepository = getCustomRepository(UsersRepository)
        const surveyRepository = getCustomRepository(SurveysRepository)
        const surveyUserRepository = getCustomRepository(SurveysUsersRepository)

        const userAlreadyExists = await userRepository.findOne({email})

        if(!userAlreadyExists){
            response.status(400).json({
                error: 'User does not exists!'
            })
        }

        const surveyAlreadyExists = await surveyRepository.findOne({id: survey_id})

        if(!surveyAlreadyExists){
            response.status(400).json({
                error:'Survey does not exists!'
            })
        }

        //salvar as informações na tabela surveyUser
        const surveyUser = surveyUserRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })

        await surveyUserRepository.save(surveyUser)
        //Enviar o email para o usuario

        return response.send(surveyUser)

    }
}

export { SendMailController }