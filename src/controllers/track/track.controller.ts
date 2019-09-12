import { Get, Request } from '@agio/framework/http';
import { Controller, Injectable } from '@agio/framework/common';
import { TrackOneValidator } from './validators/track-one.validator';
import { TrackManyValidator } from './validators/track-many.validator';
import { TrackService } from '../../services/track/track.service';

@Controller('track')
@Injectable()
export class TrackController {

    constructor(private trackService: TrackService) {}


    /**
     * Track one order with code in uri path
     *
     * @param req 
     */
    @Get('/:_code', [TrackOneValidator])
    public async trackOne(req: Request) {

        const { _code, _outputType } = req.params;

        // Track first order
        const track = (await this.trackService.get(_code))[0];

        req.sendResponse(track, track.isInvalid ? HTTP_STATUS.NOT_FOUND : HTTP_STATUS.OK);

    }


    /**
     * Track many orders with codes separated by comma in query params
     *
     * @param req 
     */
    @Get('/', [TrackManyValidator])
    public async trackMany(req: Request) {

        const { codes } = req.query;

        // Track all codes
        const tracks = await this.trackService.get(codes.split(','));

        req.sendResponse(tracks);

    }


}