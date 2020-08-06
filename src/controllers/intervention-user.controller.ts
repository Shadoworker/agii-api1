import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Intervention,
  User,
} from '../models';
import {InterventionRepository} from '../repositories';

export class InterventionUserController {
  constructor(
    @repository(InterventionRepository)
    public interventionRepository: InterventionRepository,
  ) { }

  @get('/interventions/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Intervention',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Intervention.prototype.id,
  ): Promise<User> {
    return this.interventionRepository.user(id);
  }
}
