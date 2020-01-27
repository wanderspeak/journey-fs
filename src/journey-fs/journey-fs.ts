import {
  IJourney,
  IHero,
  IAdventureLog,
  Journey,
  ISecrets,
} from '@wanderspeak/journey';
import { JourneyIO } from './journey-io';
import * as _ from 'lodash';

export type DirectoryGetter = (id: string) => string;

/**
 * Journey FS
 *
 * File system implementation of the Journey API
 */
export class JourneyFS implements IJourney {
  public static begin(dirGetter: string | DirectoryGetter): JourneyFS {
    const j = Journey.begin();
    const directory = _.isString(dirGetter) ? dirGetter : dirGetter(j.hero.id);
    return new JourneyFS(directory, j);
  }

  public static resume(directory: string): Promise<JourneyFS> {
    return JourneyIO.retrieve(directory).then((journey: Journey) => {
      return new JourneyFS(directory, journey);
    });
  }

  public hero: IHero;
  public log: IAdventureLog;
  public directory: string;
  private journey: Journey;

  private constructor(directory: string, journey: Journey) {
    this.directory = directory;
    this.journey = journey;
    this.hero = journey.hero;
    this.log = journey.log;
  }

  public set(values: Partial<IHero>): void {
    this.journey.set(values);
  }

  public setSecrets(values: Partial<ISecrets>): void {
    this.journey.setSecrets(values);
  }

  public getSecrets(): ISecrets {
    return this.journey.getSecrets();
  }

  public getSecret(fields: string | string[]): any {
    return this.journey.getSecret(fields);
  }

  public post(content: string): void {
    this.journey.post(content);
  }

  public save(): Promise<any> {
    return JourneyIO.persist(this.journey, this.directory);
  }
}
