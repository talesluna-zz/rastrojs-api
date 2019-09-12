import { object, string } from 'joi';
import { Validator } from '@agio/framework/common';

@Validator()
export class TrackOneValidator {

    public validCodePattern = /^([A-Z]{2}[0-9]{9}[A-Z]{2})$/;

    public get params() {

        return object({
            _code: string().length(13).regex(this.validCodePattern).required()
        });

    }

}