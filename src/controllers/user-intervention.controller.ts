import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Intervention,
} from '../models';
import {UserRepository} from '../repositories';

export class UserInterventionController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/interventions', {
    responses: {
      '200': {
        description: 'Array of User has many Intervention',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Intervention)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Intervention>,
  ): Promise<Intervention[]> {
    return this.userRepository.interventions(id).find(filter);
  }

  @post('/users/{id}/interventions', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Intervention)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intervention, {
            title: 'NewInterventionInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) intervention: Omit<Intervention, 'id'>,
  ): Promise<Intervention> {
    return this.userRepository.interventions(id).create(intervention);
  }

  @patch('/users/{id}/interventions', {
    responses: {
      '200': {
        description: 'User.Intervention PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intervention, {partial: true}),
        },
      },
    })
    intervention: Partial<Intervention>,
    @param.query.object('where', getWhereSchemaFor(Intervention)) where?: Where<Intervention>,
  ): Promise<Count> {
    return this.userRepository.interventions(id).patch(intervention, where);
  }

  @del('/users/{id}/interventions', {
    responses: {
      '200': {
        description: 'User.Intervention DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Intervention)) where?: Where<Intervention>,
  ): Promise<Count> {
    return this.userRepository.interventions(id).delete(where);
  }
}
