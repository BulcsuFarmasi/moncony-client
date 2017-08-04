import { Component, Input } from '@angular/core';

import { CashFlow } from '../../models/cash-flow/cash-flow';
import { Wallet } from '../../models/wallet/wallet';

@Component({
    selector:'add-cash-flow',
    templateUrl:'./add-cash-flow.html'
})

export class AddCashFlowComponent {
    
    public cashFlow:CashFlow
    @Input() wallets:Wallet[];
    @Input() wallet:Wallet;
    
    
}
