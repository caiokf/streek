import _ from 'lodash'
import { stamp } from './domain.event.utilities'

export default class MemoryPersister {
  constructor() {
    this.events = []
    this.projections = []
  }

  async persist(event) {
    const published = stamp(event)

    this.events.push(published)

    return published
  }

  async getAll() {
    return [...this.events]
  }

  async saveProjection(projection) {
    const existingProjection = this.projections[projection.key]

    this.projections[projection.key] = {
      ...existingProjection,
      ...projection,
    }

    return this.projections[projection.key]
  }

  async getAllProjections() {
    return this.projections
  }

  async getProjection(key) {
    return this.projections[key] || {}
  }

  async deleteProjection(key) {
    delete this.projections[key]
  }

  async lastProcessedEventWas(eventId, projectionKey) {
    const projection = await this.getProjection(projectionKey)
    const exists = !_.isEmpty(projection)

    if (exists) {
      this.projections[projectionKey].lastProcessedEvent = eventId
    }
  }
}
