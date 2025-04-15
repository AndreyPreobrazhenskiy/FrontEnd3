import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppComponent (standalone)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule]  // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен обновлять имя через input', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Виталий';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.name).toBe('Виталий');
  });

  it('должен показывать приветствие после вызова sayHello', () => {
    component.name = 'Андрей';
    component.sayHello();
    fixture.detectChanges();

    const greetingEl = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(greetingEl.textContent).toContain('Привет, Андрей!');
  });

  it('должен показывать приветствие после нажатия кнопки', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Александр';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();

    const greetingEl = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(greetingEl.textContent).toContain('Привет, Александр!');
  });
});
