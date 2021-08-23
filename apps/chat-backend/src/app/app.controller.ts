import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { products } from '../db/products';

import { Product } from '@wkart/interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/products')
  getProducts(): Product[] {
    return products;
  }
}
