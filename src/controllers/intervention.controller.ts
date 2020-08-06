import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Intervention} from '../models';
import {InterventionRepository} from '../repositories';

export class InterventionController {
  constructor(
    @repository(InterventionRepository)
    public interventionRepository : InterventionRepository,
  ) {}

  @post('/interventions', {
    responses: {
      '200': {
        description: 'Intervention model instance',
        content: {'application/json': {schema: getModelSchemaRef(Intervention)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intervention, {
            title: 'NewIntervention',
            
          }),
        },
      },
    })
    intervention: Intervention,
  ): Promise<Intervention> {
    return this.interventionRepository.create(intervention);
  }

  @get('/interventions/count', {
    responses: {
      '200': {
        description: 'Intervention model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Intervention) where?: Where<Intervention>,
  ): Promise<Count> {
    return this.interventionRepository.count(where);
  }

  @get('/interventions', {
    responses: {
      '200': {
        description: 'Array of Intervention model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Intervention, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Intervention) filter?: Filter<Intervention>,
  ): Promise<Intervention[]> {
    return this.interventionRepository.find(filter);
  }

  @patch('/interventions', {
    responses: {
      '200': {
        description: 'Intervention PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intervention, {partial: true}),
        },
      },
    })
    intervention: Intervention,
    @param.where(Intervention) where?: Where<Intervention>,
  ): Promise<Count> {
    return this.interventionRepository.updateAll(intervention, where);
  }

  @get('/interventions/{id}', {
    responses: {
      '200': {
        description: 'Intervention model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Intervention, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Intervention, {exclude: 'where'}) filter?: FilterExcludingWhere<Intervention>
  ): Promise<Intervention> {
    return this.interventionRepository.findById(id, filter);
  }

  @patch('/interventions/{id}', {
    responses: {
      '204': {
        description: 'Intervention PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intervention, {partial: true}),
        },
      },
    })
    intervention: Intervention,
  ): Promise<void> {
    await this.interventionRepository.updateById(id, intervention);
  }

  @put('/interventions/{id}', {
    responses: {
      '204': {
        description: 'Intervention PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() intervention: Intervention,
  ): Promise<void> {
    await this.interventionRepository.replaceById(id, intervention);
  }

  @del('/interventions/{id}', {
    responses: {
      '204': {
        description: 'Intervention DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.interventionRepository.deleteById(id);
  }
}
