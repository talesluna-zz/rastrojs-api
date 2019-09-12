import { RastroJS } from 'rastrojs';

export class TrackService {

    private rastro = new RastroJS();

    public get = (codes: string | string[]) => this.rastro.track(codes);

}