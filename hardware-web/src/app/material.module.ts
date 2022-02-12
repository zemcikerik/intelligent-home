import { NgModule, Type } from '@angular/core';

const materialModules: Type<any>[] = [

];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MaterialModule { }
