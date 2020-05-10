import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";

describe("HeroDetailComponent", () => {
  let mockActivatedRoute,
    mockHeroService,
    mockLocation: Location,
    fixture: ComponentFixture<HeroDetailComponent>;
  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return "3";
          },
        },
      },
    };
    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({ id: 3, name: "novak" }));
  });

  it("should render hero name in a h2 tag", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "NOVAK"
    );
  });
});
