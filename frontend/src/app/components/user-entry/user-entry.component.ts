import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDto } from '../../dto';

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.scss']
})
export class UserEntryComponent {

  @Input() user?: UserDto;
  @Input() disableActions: boolean = false;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  onEdit(): void {
    this.edit.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }

}
