import http, { IncomingMessage, ServerResponse } from 'http';
import EventEmitter from 'events';
import Router from './Router';

class Application {
  private readonly emitter: EventEmitter;
  
  private readonly server: http.Server;
  
  private router: Router;
  
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this.createServer();
    this.router = new Router();
  }
  
  private static getRouteMask( path: string, method: string ): string {
    return `[${ path }]:[${ method }]`;
  }
  
  public listen( port: string, callback: ( error?: Error ) => void ): void {
    this.server.listen( port, callback );
  }
  
  public addRouter( router: Router ): void {
    this.router = router;
    Object.keys( this.router.endpoints ).forEach( ( path: string ): void => {
      const endpoint = this.router.endpoints[ path ];
      
      Object.keys( endpoint ).forEach( ( method: string ): void => {
        const handler = endpoint[ method ];
        
        this.emitter.on( Application.getRouteMask( path, method ), ( req: IncomingMessage, res: ServerResponse ): void => {
          handler( req, res );
        } );
      } );
    } );
  }
  
  private createServer(): http.Server {
    return http.createServer( ( req: IncomingMessage, res: ServerResponse ): void => {
      const emitted: boolean = this.emitter.emit(
        Application.getRouteMask( req.url as string, req.method as string ),
        req,
        res,
      );
      
      if ( !emitted ) {
        res.statusCode = 404;
        res.end( '404 Not Found' );
      }
    } );
  }
}

export default Application;
