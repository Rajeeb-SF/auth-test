import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class RevokedToken extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  token: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RevokedToken>) {
    super(data);
  }
}

export interface RevokedTokenRelations {
  // describe navigational properties here
}

export type RevokedTokenWithRelations = RevokedToken & RevokedTokenRelations;
