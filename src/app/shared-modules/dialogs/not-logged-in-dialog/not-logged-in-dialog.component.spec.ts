import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { NotLoggedInComponentDialog } from './not-logged-in-dialog.component';

describe('NotLoggedInComponentDialog', () => {
  let component: NotLoggedInComponentDialog;
  let fixture: ComponentFixture<NotLoggedInComponentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [NotLoggedInComponentDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(NotLoggedInComponentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
