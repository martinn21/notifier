import {Container, Service} from 'typedi'
import {UserCategories as UserCategoriesRepository} from '../Repository/UserCategories'
import {IUserCategories} from '@lambdas/user/Contract/IUserCategories'

@Service()
export class User {
    private userCategoriesRepository: UserCategoriesRepository
    constructor() {
        this.userCategoriesRepository = Container.get(UserCategoriesRepository)
    }

    public async getAllUsers(): Promise<IUserCategories[]> {
        return await this.userCategoriesRepository.getAllUsers()
    }

    public async getUserBySubscribedCategory(category: string): Promise<IUserCategories[]> {
        return await this.userCategoriesRepository.getUserBySubscribedCategory(category)
    }
}