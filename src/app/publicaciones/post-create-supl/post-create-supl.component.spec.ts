import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateSuplComponent } from './post-create-supl.component';

describe('PostCreateSuplComponent', () => {
  let component: PostCreateSuplComponent;
  let fixture: ComponentFixture<PostCreateSuplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCreateSuplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCreateSuplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
