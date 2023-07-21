import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotationController } from './quotation/quotation.controller';
import { ContactService } from './contact/contact.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, QuotationController],
  providers: [AppService, ContactService],
})
export class AppModule {}
