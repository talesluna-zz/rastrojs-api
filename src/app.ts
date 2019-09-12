import { App } from '@agio/framework/core';
import { TrackController } from './controllers/track/track.controller';
import { IndexController } from './controllers/index/index.controller';
import { environment } from '@agio/framework/environment';

// HEROKU SUPPORT
environment.server.port = +process.env.PORT || environment.server.port;

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
