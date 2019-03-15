import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { MiningComponent } from './mining/mining.component';
import { OrderbookComponent } from './orderbook/orderbook.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionbookComponent } from './orders/transactionbook.component';
import { FormsModule } from '@angular/forms';
import { BlockchainComponent } from './blockchain/blockchain.component';
import { BalanceComponent } from './balance/balance.component';
import { NgxPopoverCardComponent } from './blockchain/blockchain-exsample.component';
import { NgxPopoverFormComponent } from './blockchain/blockchain-exsample.component';
import { NgxPopoverTabsComponent } from './blockchain/blockchain-exsample.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  imports: [
    ThemeModule,
    FormsModule
  ],
  declarations: [
    NgxPopoverCardComponent,NgxPopoverFormComponent,NgxPopoverTabsComponent,
    DashboardComponent,
    MiningComponent,
    OrderbookComponent,
    TransactionComponent,
    TransactionbookComponent,
    BlockchainComponent,
    BalanceComponent,
    SpinnerComponent,
  ],
})
export class DashboardModule { }
