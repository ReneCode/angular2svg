/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SvgElementComponent } from './svg-element.component';

describe('SvgElementComponent', () => {
  let component: SvgElementComponent;
  let fixture: ComponentFixture<SvgElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgElementComponent);
    component = fixture.componentInstance;
    component.element = {
      type: 'line',
      x1: 44,
      y1: 55,
      x2: 66,
      y2: 77
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('line')).toBeTruthy();
  });

  it('should set x1-y2', () => {
    expect(fixture.nativeElement.querySelector('line').getAttribute('x1')).toBe('44');
    expect(fixture.nativeElement.querySelector('line').getAttribute('y1')).toBe('55');
    expect(fixture.nativeElement.querySelector('line').getAttribute('x2')).toBe('66');
    expect(fixture.nativeElement.querySelector('line').getAttribute('y2')).toBe('77');
  });

});
