import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LocationDetailComponent } from './location-detail.component';

describe('Location Management Detail Component', () => {
  let comp: LocationDetailComponent;
  let fixture: ComponentFixture<LocationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LocationDetailComponent,
              resolve: { location: () => of({ id: 'ABC' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LocationDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load location on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LocationDetailComponent);

      // THEN
      expect(instance.location()).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
