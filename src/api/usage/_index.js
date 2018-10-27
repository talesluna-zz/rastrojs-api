
// Middleware
import usage from './usage';

export default (route) => {

    route.get('/', usage);

};