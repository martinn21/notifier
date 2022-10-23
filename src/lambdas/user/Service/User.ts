import {Container, Service} from 'typedi'
import {IUser} from "@lambdas/user/Contract/IUser";
import {User as UserRepository} from '../Repository/User'

@Service()
export class User {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = Container.get(UserRepository)
    }

    public async getAllUsers(): Promise<IUser[]> {
        return await this.userRepository.getAllUsers()
    }
}