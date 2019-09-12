import { App } from '@agio/framework/core';
import { TrackController } from './controllers/track/track.controller';
import { IndexController } from './controllers/index/index.controller';

const app = new App(
    {
        controllers: [
            IndexController,
            TrackController
        ]
    }
);


app.start()
    .then((message) => console.info(message))
