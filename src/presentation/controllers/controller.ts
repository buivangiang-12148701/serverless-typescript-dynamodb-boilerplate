import { type APIGatewayProxyEvent, type APIGatewayProxyResult, type Callback, type Context } from 'aws-lambda'
import middy, { type MiddyfiedHandler } from '@middy/core'

type HookParams = Record<string, any>
type HookResult = {
  beforePrefetch: () => Promise<void>
  requestStart: () => Promise<void>
  beforeMiddleware: (fctName: string) => Promise<void>
  afterMiddleware: (fctName: string) => Promise<void>
  beforeHandler: () => Promise<void>
  afterHandler: () => Promise<void>
  requestEnd: (request: middy.Request) => Promise<void>
}

export abstract class Controller {
  handler: MiddyfiedHandler
  protected constructor () {
    this.handler = middy(this.defineHooks())
    this.addMiddlewares()
    this.handler.handler(this.perform)
  }

  abstract perform (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyResult>

  /**
   * add middlewares to the handler with order
   */
  get middlewares (): Array<middy.MiddlewareObj<any, any, Error, any>> {
    return []
  }

  /**
   * add dependencies for class
   */
  get dependencies (): Set<string> {
    return new Set<string>()
  }

  /**
   * Triggered once before middlewares are attached and prefetches are executed.
   * @protected
   */
  protected async beforePrefetch (): Promise<void> {
    return Promise.resolve()
  }

  /**
   * Triggered on every request before the first middleware.
   * @protected
   */
  protected async requestStart (): Promise<void> {
    return Promise.resolve()
  }

  /**
   * Triggered before every before, after, and onError middleware function. The function name is passed in
   * this is why all middlewares use a verbose naming pattern.
   * @protected
   */
  protected async beforeMiddleware (_fctName: string): Promise<void> {
    return Promise.resolve()
  }

  /**
   * Triggered after every before, after, and onError middleware function. The function name is passed in
   * this is why all middlewares use a verbose naming pattern.
   * @protected
   */
  protected async afterMiddleware (_fctName: string): Promise<void> {
    return Promise.resolve()
  }

  /**
   * Triggered before the handler.
   * @protected
   */
  protected async beforeHandler (): Promise<void> {
    return Promise.resolve()
  }

  /**
   * Triggered after the handler.
   * @protected
   */
  protected async afterHandler (): Promise<void> {
    return Promise.resolve()
  }

  /**
   * Triggered right before the response is returned, including thrown errors.
   * @protected
   */
  protected async requestEnd (_request: middy.Request): Promise<void> {
    return Promise.resolve()
  }

  private addMiddlewares (): void {
    const middlewares = Array.isArray(this.middlewares) ? this.middlewares : [this.middlewares]
    this.handler.use(middlewares)
  }

  /**
   * provides hooks into it's core to allow for monitoring, setup, and cleaning that may not be possible within a middleware.
   * @protected
   */
  protected defineHooks (_params: HookParams = {}): any {
    return {
      beforePrefetch: this.beforePrefetch,
      requestStart: this.requestStart,
      beforeMiddleware: this.beforeMiddleware,
      afterMiddleware: this.afterMiddleware,
      beforeHandler: this.beforeHandler,
      afterHandler: this.afterHandler,
      requestEnd: this.requestEnd
    } satisfies HookResult
  }
}
