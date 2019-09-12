import { Request, All } from '@agio/framework/http';
import { Controller } from '@agio/framework/common';

@Controller()
export class IndexController {

    @All('/')
    public index(req: Request) {
        req.sendResponse({
            app: 'rastrojs-api',
            version: '3.0.0',
            routes: {
                one: 'GET /track/:_code',
                many: 'GET /track/?codes=1,2,3',
            }
        })
    }

}