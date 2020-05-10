import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

@Directive({
  selector: "[routerLink]",
  host: { "(click)": "onClick()" },
})
class RouterLinkDirectiveStub {
  @Input("routerLink") linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe("HeroesComponent", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES: Hero[];

  beforeEach(() => {
    HEROES = [
      { name: "kelvin", id: 1, strength: 20 },
      { name: "superman", id: 2, strength: 10 },
    ];
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService,
        },
      ],
      //   schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should render each as a hero component", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //run ngOnit
    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponentsDEs.length).toEqual(2);

    expect(heroComponentsDEs[0].componentInstance.hero.name).toEqual("kelvin");
    expect(heroComponentsDEs[1].componentInstance.hero.name).toEqual(
      "superman"
    );
  });

  it("should call heroService.deleteHero when HeroComponent delete is called", () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //run ngOnit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    // heroComponents[0]
    //   .query(By.css("button"))
    //   .triggerEventHandler("click", { stopPropagation: () => {} });

    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it("should add a new Hero to the Hero list when the add button is clicked", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //run ngOnit
    fixture.detectChanges();

    const name = "Mr Ice";
    mockHeroService.addHero.and.returnValue(
      of({ id: 5, name: name, strength: 4 })
    );

    const inputElement = fixture.debugElement.query(By.css("input"))
      .nativeElement;
    const button = fixture.debugElement.queryAll(By.css("button"))[0];

    inputElement.value = name;
    button.triggerEventHandler("click", null);
    fixture.detectChanges();
    const heroText = fixture.debugElement.query(By.css("ul")).nativeElement
      .textContent;
    expect(heroText).toContain(name);
  });

  it("should have the correct router for the first hero", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    let routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css("a")).triggerEventHandler("click", null);
    expect(routerLink.navigatedTo).toBe("/detail/1");
  });
});
