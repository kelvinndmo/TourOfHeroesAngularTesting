import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { inject } from "@angular/core/testing";

describe("HeroService", () => {
  let mockMessageService: MessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add"]);
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
      ],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });

  describe("getHero", () => {
    // it("should call with the correct url", inject(
    //     [HeroService, HttpTestingController],
    //     (service: HeroService, controller: HttpTestingController) => {
    //       service.getHero(4).subscribe();
    //     }
    //   ));
    it("should call get with the correct URL", () => {
      service.getHero(4).subscribe(() => {
        console.log("fulfilled");
      });

      const req = httpTestingController.expectOne("api/heroes/4");
      req.flush({ id: 4, name: "superdude", strength: 100 });
      //get exactly what we expect
      httpTestingController.verify();
    });
  });
});
