"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const app_config_1 = require("./shared/config/app.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(app_config_1.APP_CONFIG.port);
    console.log(`Server running on port ${app_config_1.APP_CONFIG.port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map