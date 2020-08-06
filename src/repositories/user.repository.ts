import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Intervention} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {InterventionRepository} from './intervention.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly interventions: HasManyRepositoryFactory<Intervention, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('InterventionRepository') protected interventionRepositoryGetter: Getter<InterventionRepository>,
  ) {
    super(User, dataSource);
    this.interventions = this.createHasManyRepositoryFactoryFor('interventions', interventionRepositoryGetter,);
    this.registerInclusionResolver('interventions', this.interventions.inclusionResolver);
  }
}
