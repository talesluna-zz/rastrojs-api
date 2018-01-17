// Joi Validate
import readValidate from './_validates/read.validate';

// Middleware
import readObject from './read';

export default (route) => {

    route.get('/objetos/:_objectsId/:_outputType', readValidate, readObject);
    
};