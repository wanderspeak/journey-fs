import { IHero, ISecrets, IAdventureLog } from '@wanderspeak/journey';

export class JourneyCodec {
  public static encodeHero(hero: IHero): string {
    return JSON.stringify(hero);
  }
  public static encodeAdventureLog(log: IAdventureLog): string {
    return JSON.stringify(log);
  }
  public static encodeSecrets(secrets: ISecrets): string {
    return JSON.stringify(secrets);
  }
  public static decodeHero(hero: string): IHero {
    return JSON.parse(hero);
  }
  public static decodeAdventureLog(log: string): IAdventureLog {
    return JSON.parse(log);
  }
  public static decodeSecrets(secrets: string): ISecrets {
    return JSON.parse(secrets);
  }
}
