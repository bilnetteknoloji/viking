import { env } from '../config/env';

export class WhatsAppService {
  private apiKey: string;

  constructor() {
    if (!env.WHATSAPP_API_KEY) {
      throw new Error('WhatsApp API key is not configured');
    }
    this.apiKey = env.WHATSAPP_API_KEY;
  }

  async sendMessage(phoneNumber: string, message: string): Promise<void> {
    // TODO: Implement WhatsApp message sending logic using Twilio or other provider
    console.log(`Sending WhatsApp message to ${phoneNumber}: ${message}`);
  }

  async sendBookingConfirmation(phoneNumber: string, bookingDetails: any): Promise<void> {
    const message = this.createBookingConfirmationMessage(bookingDetails);
    await this.sendMessage(phoneNumber, message);
  }

  private createBookingConfirmationMessage(bookingDetails: any): string {
    // TODO: Implement message template
    return `Your booking has been confirmed!\nBooking details: ${JSON.stringify(bookingDetails)}`;
  }
}
