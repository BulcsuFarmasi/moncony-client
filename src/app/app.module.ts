import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AppComponent } from './app.component';

import { CashFlowService } from '../services/cash-flow/cash-flow.service';
import { WalletService } from '../services/wallet/wallet.service';

import { AddCashFlowPage } from '../pages/add-cash-flow/add-cash-flow';
import { AddWalletPage } from '../pages/add-wallet/add-wallet';
import { CashFlowsPage } from '../pages/cash-flows/cash-flows';
import { HomePage } from '../pages/home/home'
import { ModifyCashFlowPage } from '../pages/modify-cash-flow/modify-cash-flow';
import { ModifyWalletPage } from '../pages/modify-wallet/modify-wallet';
import { WalletsPage } from '../pages/wallets/wallets';

@NgModule({
  declarations: [
    AppComponent,
    AddCashFlowPage,
    AddWalletPage,
    CashFlowsPage,
    HomePage,
    ModifyCashFlowPage,
    ModifyWalletPage,
    WalletsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    AddCashFlowPage,
    AddWalletPage,
    CashFlowsPage,
    HomePage,
    ModifyCashFlowPage,
    ModifyWalletPage,
    WalletsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CashFlowService,
    WalletService
  ]
})
export class AppModule {}
