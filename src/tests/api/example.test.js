import assert       from 'assert';
import app          from '../../app';
import chai         from 'chai';
import chaiHttp     from 'chai-http';

chai.use(chaiHttp);
const should = chai.should();
const server = chai.request(app);

before((done) => {
    app.on('app_started', () => {
        done()
    });
});

describe('Examples', () => {

    describe('GET /name', () => {
        it('Should be response with success on request /my_name', (done) => {
            server
                .get('/someone')
                .end((err, res) => {
                    assert.deepEqual(res.statusCode, 200);
                    done();
                });
        });
    });

    describe('GET /mongo?limit=2', () => {
        it('Should be response with success on request /mongo?limit=2', (done) => {
            server
                .get('/mongo?limit=2')
                .end((err, res) => {
                    assert(res.body.data[0]._id);
                    assert.deepEqual(res.body.code, 200);
                    done();
                });
        });
    });

    describe('GET /not/exists', () => {
        it('Should be response with error on request /not/exists', (done) => {
            server
                .get('/not/exists')
                .end((err, res) => {
                    assert.deepEqual(res.body.code, 404);
                    done();
                });
        });
    })
});