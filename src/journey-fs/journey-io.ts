import { Journey } from '@wanderspeak/journey';
import { JourneyCodec } from './journey-codec';

export enum FileName {
  HERO = 'hero.json',
  ADVENTURELOG = 'adventurelog.json',
  SECRETS = 'secrets.json',
}

export class JourneyIO {
  public static fs: any;

  public static persist(journey: Journey, directoryName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      JourneyIO.fs.mkdir(directoryName, { recursive: true }, (err: any) => {
        if (err) {
          reject(err);
        }
        Promise.all([
          JourneyIO.writeFile(
            directoryName,
            FileName.HERO,
            JourneyCodec.encodeHero(journey.hero)
          ),
          JourneyIO.writeFile(
            directoryName,
            FileName.ADVENTURELOG,
            JourneyCodec.encodeAdventureLog(journey.log)
          ),
          JourneyIO.writeFile(
            directoryName,
            FileName.SECRETS,
            JourneyCodec.encodeSecrets(journey.getSecrets())
          ),
        ]).then(() => {
          resolve();
        });
      });
    });
  }

  public static retrieve(directoryName: string): Promise<Journey> {
    return Promise.all([
      JourneyIO.readFile(directoryName, FileName.HERO),
      JourneyIO.readFile(directoryName, FileName.ADVENTURELOG),
      JourneyIO.readFile(directoryName, FileName.SECRETS),
    ]).then(
      ([hero, log, secrets]) =>
        new Journey(
          JourneyCodec.decodeHero(hero as string),
          JourneyCodec.decodeAdventureLog(log as string),
          JourneyCodec.decodeSecrets(secrets as string)
        )
    );
  }

  private static writeFile(dir: string, name: FileName, data: string) {
    const fileName = `${dir}/${name}`;
    return new Promise((resolve, reject) => {
      JourneyIO.fs.writeFile(fileName, data, (err2: any) => {
        if (err2) {
          reject(err2);
        }
        resolve();
      });
    });
  }

  private static readFile(dir: string, name: FileName) {
    const fileName = `${dir}/${name}`;
    return new Promise((resolve, reject) => {
      return JourneyIO.fs.readFile(fileName, (err2: any, data: any) => {
        if (err2) {
          reject(err2);
        }
        resolve(data as string);
      });
    });
  }
}
