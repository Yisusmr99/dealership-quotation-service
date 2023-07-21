import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactService } from '../contact/contact.service';

@Controller('quotation')
export class QuotationController {
    constructor(private contactService: ContactService) {}
    private message = 'An error occurred while processing your request';
    private result = false;

    @Post()
    async submitContactForm(@Body() formData: any): Promise<any> {
        
        try {
            await this.contactService.sendEmail(formData);
            this.message = 'Contact form sent successfully';
            this.result = true;
            return { 
                message:  this.message,
                result: this.result
            };
        } catch (error) {
            await this.contactService.sendEmail(formData);
            return { 
                message: this.message,
                result: this.result 
            };
        }
    }
}
