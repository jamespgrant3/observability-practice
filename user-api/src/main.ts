import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = parseInt(process.env.PORT) || 3000;
  console.log(`listening on port ${port}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(port as number);
}
bootstrap();
