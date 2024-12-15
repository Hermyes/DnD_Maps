import { resolve } from 'path';

import { generateApi } from 'swagger-typescript-api';

generateApi({
    name: 'Api.ts',
    output: resolve(process.cwd(), './src/api'),
    url: 'http://192.168.1.33:8000/swagger/?format=openapi', // менять когда меняешь вайфай
    httpClientType: 'axios',
});