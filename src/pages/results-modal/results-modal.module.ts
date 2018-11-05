import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultsModalPage } from './results-modal';

@NgModule({
  declarations: [
    ResultsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultsModalPage),
  ],
})
export class ResultsModalPageModule {}
