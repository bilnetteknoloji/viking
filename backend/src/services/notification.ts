import { messaging } from 'firebase-admin';
import { env } from '../config/env';
import admin from 'firebase-admin';

export class NotificationService {
  private messaging: messaging.Messaging;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(env.FIREBASE_CONFIG as admin.ServiceAccount),
      });
    }
    this.messaging = admin.messaging();
  }

  async sendPushNotification(token: string, title: string, body: string, data?: Record<string, string>) {
    const message: messaging.Message = {
      token,
      notification: {
        title,
        body,
      },
      data,
    };

    try {
      const response = await this.messaging.send(message);
      console.log('Successfully sent message:', response);
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async sendMulticastNotification(tokens: string[], title: string, body: string, data?: Record<string, string>) {
    const message: messaging.MulticastMessage = {
      tokens,
      notification: {
        title,
        body,
      },
      data,
    };

    try {
      const response = await this.messaging.sendMulticast(message);
      console.log('Successfully sent messages:', response);
      return response;
    } catch (error) {
      console.error('Error sending messages:', error);
      throw error;
    }
  }
}
