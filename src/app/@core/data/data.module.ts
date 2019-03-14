import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderbookService } from './orderbook.service';
import { BlockchainService } from './blockchain.service';
import { UserService } from './users.service';
import { StateService } from './state.service';
import { UpdateService } from './update.service';

const SERVICES = [
  UserService,
  OrderbookService,
  StateService,
  BlockchainService,
  UpdateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
