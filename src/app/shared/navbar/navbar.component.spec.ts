import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain search link', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a[href="/search"]').textContent).toContain('Search');
  });

  it('should contain bookmarks link', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a[href="/bookmarks"]').textContent).toContain('Bookmarks');
  });
});
