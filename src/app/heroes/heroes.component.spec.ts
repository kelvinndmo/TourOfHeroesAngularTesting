import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe("HeroesComponent", () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;
  beforeEach(function () {
    HEROES = [
      { id: 1, name: "Kelvin", strength: 8 },
      { id: 2, name: "Auba", strength: 10 },
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);
    component = new HeroesComponent(mockHeroService);
  });

  describe("Delete", () => {
    it("Should delete a hero from the heroes list", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[1]);
      expect(component.heroes.length).toBe(1);
    });

    it("Should call deleteHero", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[1]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
    });
  });
});
