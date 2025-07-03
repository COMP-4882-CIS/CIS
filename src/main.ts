import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get base path from environment variable for Traefik deployment
  const basePath = process.env.BASE_PATH || '';
  
  if (basePath) {
    app.setGlobalPrefix(basePath);
  }

  app.enableCors({
    origin: [
      'https://iis.memphis.edu',
      'https://memphis.edu',
      'http://localhost:3000',
      'http://localhost:3001'
    ],
    credentials: true,
    exposedHeaders: 'Content-Type, Content-Disposition, Attachment-Filename',
  });

  const config = new DocumentBuilder()
    .setTitle('CIS API')
    .setDescription('Child Impact Statements backend API reference')
    .setVersion('1.0')
    .addServer(basePath ? `https://iis.memphis.edu${basePath}` : 'http://localhost:3000')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${basePath}/api`, app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 CIS Backend running on port ${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}${basePath}/api`);
  if (basePath) {
    console.log(`🌐 Base path: ${basePath}`);
    console.log(`🌐 Production URL: https://iis.memphis.edu${basePath}`);
  }
}

bootstrap().then();
