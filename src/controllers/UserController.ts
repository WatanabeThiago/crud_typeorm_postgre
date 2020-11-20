import { Request, response, Response } from 'express'
import { getRepository, getConnection, ReplSet } from 'typeorm'

import User from '../database/entity/User'
class UserController {
    async create(req: Request, res: Response) {
        const repo = getRepository(User)

        const { name } = req.body;

        const userExists = await repo.findOne({ where: {name}})

        if(userExists)
        {
            return response.json('Usuario já existente')
        }

        try {
            const user = repo.create({
                name
            })
            await repo.save(user)
            return res.status(201).json(user)
        }
        catch (err) {
            console.log(err.message)
        }
    }
    async list(req: Request, res: Response) {
        try {
            res.json(await getRepository(User).find())
        }
        catch (err) {
            console.log(err.message)
        }
    }
    async listOne(req: Request, res: Response) {
        try {
            const repository = getRepository(User)
            const data = await repository.find({
                where: {
                    name: req.params.name
                }
            })
            res.json(data)
        }
        catch (err) {
            console.log(err.message)
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const id = req.params;
            console.log(id)
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(User)
                .where(id)
                .execute();
            console.log('DELETADO')
            res.send(`Usuario com ID ${id} foi deletado`)

        } catch (err) {
            console.log(err.message)
        }
    }
    async update(req: Request, res: Response) {
        const id = req.params;
        console.log(id)
        const { name} = req.body;
        const dados = { name }

        try{
                const users_update = await getRepository(User).update(
                    id,
                    dados
                );
                return res.status(200).json({
                    message: 'Usuario atualizado com sucesso',
                    data: users_update
                })
        }
        catch(err)
        {
            return res.status(201).json({
                message: 'Falha ao atualizar o usuario',
                info: err
            })
        }
        }
}



export default new UserController()
