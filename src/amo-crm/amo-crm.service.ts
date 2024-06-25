import { Injectable } from '@nestjs/common';
import { Client } from 'amocrm-js';

@Injectable()
export class AmoCrmService {
  private readonly Client: Client;

  constructor() {
    this.Client = new Client({
      domain: 'leshadjet', // Замените на свой домен AmoCRM
      auth: {
        client_id: 'c64411d4-c5fc-4750-96fb-a4dddb0e8f7b', // Замените на свой Client ID
        client_secret:
          'sslvOgi1m9wYKKJrcr22a4OmKq1IoJlLOI0ixBwew3XioFsrupHnROWqyek1e8h9', // Замените на свой Client Secret
        redirect_uri: 'https://localhost.com',
        bearer:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVkM2E4YmM0NjdmNTMwYjVlNjAwODNjOTk5YzY0NTZkN2Q2MWQzYjE1OWY3NDFiYmVhOTljMjExNDc2NDUzOTM0MzJlMmU3OWQzZTIxMjAyIn0.eyJhdWQiOiJjNjQ0MTFkNC1jNWZjLTQ3NTAtOTZmYi1hNGRkZGIwZThmN2IiLCJqdGkiOiJlZDNhOGJjNDY3ZjUzMGI1ZTYwMDgzYzk5OWM2NDU2ZDdkNjFkM2IxNTlmNzQxYmJlYTk5YzIxMTQ3NjQ1MzkzNDMyZTJlNzlkM2UyMTIwMiIsImlhdCI6MTcxOTI0MjQ5MSwibmJmIjoxNzE5MjQyNDkxLCJleHAiOjE3MTk3MDU2MDAsInN1YiI6IjExMTk1ODM4IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxODE2Mzk4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiOTUzZmNhZDUtNTA2OS00NDIxLWE1MDQtZDUzYWZhZjY0ZDI2In0.Fu5DE4rT5Sl4YHjXL3Zivm9ASh0aGnpZvZ1Gq8v-mfdecyY_QHcn6mhnWpeEBdZ_4bb7WizfmR4_fFnqR5MsIgPnUgWjpFFQlApv86glzdonGKnU7UOGbIc2dncQ0feCvo-DETkNnay2Mpma3XaVbSfUUUZ0PvwaNl8bmOmUA5THnzPcvqKhLw8fziSy3oKoTMxiH5tFrQZkNexxzOR9glgfvtO1UYRqGIKVfJ_EjXfg7gffKVuqaBEZVmPZOP4FEMkdY74Jqg5SG2YGCFPO_cKQOg51rJ2HXMmMVIa4TXJupyBhiVb4C_1Uuz-p0_FnSd23hFlEsXumH4ufc04Bew',
      },
    });
  }

  async getLeads(id: number): Promise<any> {
    if (id && ('' + id).split('').map(Number).length < 6) {
      return {
        status: 400,
        message: 'id от 6 символов',
      };
    }

    const response = await this.Client.request.make(
      'GET',
      `/api/v4/leads?with=contacts${id ? `&filter[id]=${id}` : ''}`,
    );
    return response.data;
  }
  async getContact(id: number): Promise<any> {
    if (!id) {
      return {
        status: 400,
        message: 'отсутвует id',
      };
    }
    const response = await this.Client.request.make(
      'GET',
      `/api/v4/contacts${id ? `?filter[id]=${id}` : ''}`,
    );
    return response.data;
  }
}
