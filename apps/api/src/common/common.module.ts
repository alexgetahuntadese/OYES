import { Module, Global } from '@nestjs/common';
import { CurrencyService } from './services/currency.service';
import { MultiCurrencyService } from './services/multi-currency.service';

@Global()
@Module({
  providers: [CurrencyService, MultiCurrencyService],
  exports: [CurrencyService, MultiCurrencyService],
})
export class CommonModule {}
