import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {

    constructor(private configService: ConfigService) {}

    async sendEmail(formData: any): Promise<void> {
        const transporter = nodemailer.createTransport({
        host: this.configService.get<string>('MAILTRAP_HOST'),
        port: this.configService.get<number>('MAILTRAP_PORT'),
        auth: {
            user: this.configService.get<string>('MAILTRAP_USER'),
            pass: this.configService.get<string>('MAILTRAP_PASS'),
        },
        });

        const message = {
        from: this.configService.get<string>('MAILTRAP_FROM'),
        to: this.configService.get<string>('MAILTRAP_TO'),
        subject: 'Contact Form Submission',
        html: `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
        <html lang="en">
        <head>
            <meta http-equiv="Content-Type" charset="UTF-8">
            <title>Contact Form Submission</title>
            <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                color: #212529;
            }
    
            @media (min-width: 576px) {
                .jumbotron {
                    padding: 4rem 2rem;
                }
            }
    
            .jumbotron {
                padding: 2rem 1rem;
                margin-bottom: 2rem;
                background-color: #e9ecef;
                border-radius: .3rem;
            }
    
            @media (min-width: 576px) {
                .container {
                    max-width: 540px;
                }
            }
    
            @media (min-width: 992px) {
                .container {
                    max-width: 960px;
                }
            }
    
            @media (min-width: 1200px) {
                .container {
                    max-width: 1140px;
                }
            }
    
            .container {
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                margin-right: auto;
                margin-left: auto;
            }
    
            .text-center {
                text-align: center;
            }
    
            h2 {
                font-size: 2rem;
                font-weight: 500;
                line-height: 1.2;
            }
    
            a {
                color: #007bff;
                background-color: transparent;
                text-decoration: none;
            }
            </style>
        </head>
        <body>
            <div class="jumbotron">
                <div class="container text-center">
                    <h3>Contact Form Submission</h3>
                    <h2> ${formData.nombres} ${formData.apellidos}</h2>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <p><strong>Teléfono:</strong> ${formData.telefono}</p>
                    <p><strong>Marca:</strong> ${formData.marca}</p>
                    <p><strong>Mensaje:</strong> ${formData.mensaje}</p>
                </div>
            </div>
        </body>
        </html>
        `,
        };

        await transporter.sendMail(message);
    }

}
