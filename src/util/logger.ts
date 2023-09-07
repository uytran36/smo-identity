export default class Logger {
   private static readonly errorColor: string = 'red'
   private static readonly infoColor: string = 'cyan'
   private static readonly warningColor: string = 'yellow'

   static info(msg: string) {
      console.log(`%c[INFO]: ${msg}`, `color: ${Logger.infoColor}`)
   }

   static warn(msg: string) {
      console.log(`%c[WARN]: ${msg}`, `color: ${Logger.warningColor}`)
   }

   static error(err: Error | string) {
      const msg = err instanceof Error ? err.stack : err
      console.log(`%c[ERR]: ${msg}`, `color: ${Logger.errorColor}`)
   }
}
