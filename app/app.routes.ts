import { Routes } from '@angular/router';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';
import { CanActivateGuard } from './guards/can-activate-guard.guard';
import { CanDeactivateGuard } from './guards/can-deactivate-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'page1', pathMatch: 'full' },
  { path: 'page1', component: Page1Component, canActivate: [CanActivateGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'page2/:id', component: Page2Component, canActivate: [CanActivateGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'page3', component: Page3Component, canActivate: [CanActivateGuard], canDeactivate: [CanDeactivateGuard] },
];
