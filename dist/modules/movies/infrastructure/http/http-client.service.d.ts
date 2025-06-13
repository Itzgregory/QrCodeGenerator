import { HttpService } from '@nestjs/axios';
export declare class HttpClientService {
    private readonly httpService;
    constructor(httpService: HttpService);
    get(url: string): Promise<any>;
}
