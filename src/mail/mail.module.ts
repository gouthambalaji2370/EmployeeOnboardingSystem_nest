import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: 'tradhakrishnan1940@gmail.com',
          pass: 'foirqrwsfcdagaam',
        },
        connectionTimeout:5000,
        socketTimeout:5000,
      },
      defaults: {
        from: '"HR ADMIN" <tradhakrishnan1940@gmail.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
