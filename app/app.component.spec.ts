import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';

describe('AppComponent (standalone) with navigate()', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // Standalone компонент
        RouterTestingModule.withRoutes([
          { path: 'page1', component: Page1Component },
          { path: 'page2/:id', component: Page2Component },
          { path: 'page3', component: Page3Component },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('должен переходить на страницу Page1 при вызове goToPage1()', async () => {
    spyOn(router, 'navigate');
    component.goToPage1();
    expect(router.navigate).toHaveBeenCalledWith(['/page1']);
  });

  it('должен переходить на страницу Page2 с параметром при вызове goToPage2()', async () => {
    spyOn(router, 'navigate');
    component.goToPage2();
    expect(router.navigate).toHaveBeenCalledWith(['/page2', 123]);
  });

  it('должен переходить на страницу Page3 при вызове goToPage3()', async () => {
    spyOn(router, 'navigateByUrl');
    component.goToPage3();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/page3');
  });
});