import Service from './service';
import CorreiosFindObject from './correios/correios.findObject';

class CorreiosService extends Service {
    constructor() {
        super();
    }

    findObject(objectId) {
        return CorreiosFindObject.find(objectId);
    }
}

export default new CorreiosService();