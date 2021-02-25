import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!",
            });
        }

        const user = usersRepository.create(({
            name,
            email
        }));

        await usersRepository.save(user);

        return response.json(user);
    }

    async show(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UsersRepository);

        const all = await usersRepository.find();

        return response.json(all);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getCustomRepository(UsersRepository);

        const userToRemove = await usersRepository.findOne({ id });

        await usersRepository.remove(userToRemove);

        return response.json({message: "User deleted!"});
    }
}

export { UserController };
