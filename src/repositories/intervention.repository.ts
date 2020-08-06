import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Intervention, InterventionRelations, User} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class InterventionRepository extends DefaultCrudRepository<
  Intervention,
  typeof Intervention.prototype.id,
  InterventionRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Intervention.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Intervention, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
