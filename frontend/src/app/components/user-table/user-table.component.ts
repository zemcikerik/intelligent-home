import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDto } from '../../dto';
import { AppFacade } from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {

  @Input() users: UserDto[] | null = null;
  @Output() edit = new EventEmitter<UserDto>();
  @Output() delete = new EventEmitter<UserDto>();

  displayedColumns = ['icon', 'username', 'role', 'options'];

  constructor(private appFacade: AppFacade) {
  }

  isCurrentUser(user: UserDto): Observable<boolean> {
    return this.appFacade.isCurrentUser(user);
  }

}
