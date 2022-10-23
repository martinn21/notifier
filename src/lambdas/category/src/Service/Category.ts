import {ICategory} from '@lambdas/category/src/Contract/ICategory'
import {Container, Service} from 'typedi'
import {Category as CategoryRepository} from '../Repository/Category'

@Service()
export class Category {
    private categoryRepository: CategoryRepository
    constructor() {
        this.categoryRepository = Container.get(CategoryRepository)
    }
    public async getAllCategories(): Promise<ICategory[]> {
        return await this.categoryRepository.getAllCategories()
    }
}