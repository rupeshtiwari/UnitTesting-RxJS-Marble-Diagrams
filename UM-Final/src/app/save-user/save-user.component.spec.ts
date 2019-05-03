import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApi } from '../api/user.api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaveUserComponent } from './save-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { cold } from 'jasmine-marbles';

describe('SaveUserComponent', () => {
  let component: SaveUserComponent;
  let fixture: ComponentFixture<SaveUserComponent>;
  let userApi: UserApi;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaveUserComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: UserApi,
          useValue: {
            saveUser: jest.fn(),
            getUserById: jest.fn()
          }
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveUserComponent);
    component = fixture.componentInstance;
    userApi = TestBed.get(UserApi);
  });

  it('should compile', () => {

  });

  it('should create', () => {

  });
});
