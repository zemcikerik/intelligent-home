import { NgModule, Type } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'

const materialModules: Type<any>[] = [
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MaterialModule { }
