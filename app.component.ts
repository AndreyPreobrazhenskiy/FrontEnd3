import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-root',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements 
OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
AfterViewInit, AfterViewChecked, OnDestroy {

name: string = '';
greeting: string = '';

constructor() {
console.log('Constructor вызван');
}

ngOnChanges(changes: SimpleChanges): void {
console.log('ngOnChanges вызван', changes);
}

ngOnInit(): void {
console.log('ngOnInit вызван');
}

ngDoCheck(): void {
console.log('ngDoCheck вызван');
}

ngAfterContentInit(): void {
console.log('ngAfterContentInit вызван');
}

ngAfterContentChecked(): void {
console.log('ngAfterContentChecked вызван');
}

ngAfterViewInit(): void {
console.log('ngAfterViewInit вызван');
}

ngAfterViewChecked(): void {
console.log('ngAfterViewChecked вызван');
}

ngOnDestroy(): void {
console.log('ngOnDestroy вызван');
}

sayHello(): void {
this.greeting = `Привет, ${this.name}!`;
}
}
