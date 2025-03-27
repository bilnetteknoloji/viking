import { Logger } from 'winston';

declare global {
  var logger: Logger;
  namespace NodeJS {
    interface Global {
      logger: Logger;
    }
  }
}
