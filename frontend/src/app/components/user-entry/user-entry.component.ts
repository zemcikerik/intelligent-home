import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDto } from '../../dto';
import { AppFacade } from '../../store';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.scss']
})
export class UserEntryComponent implements OnInit {

  @Input() user?: UserDto;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  currentUser$: Observable<boolean> = EMPTY;

  constructor(private appFacade: AppFacade) {
  }

  ngOnInit(): void {
    if (this.user) {
      this.currentUser$ = this.appFacade.isCurrentUser(this.user);
    }
  }

  onEdit(): void {
    this.edit.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }

}
