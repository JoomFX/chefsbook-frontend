import { NotificatorService } from './../../core/services/notificator.service';
import { RecipesDataService } from './../services/recipes-data.service';
import { TotalNutritionComponent } from './../total-nutrition/total-nutrition.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { RecipeViewComponent } from './../recipe-view/recipe-view.component';
import { ItemNutritionComponent } from './../item-nutrition/item-nutrition.component';
import { AddContentsComponent } from './../add-contents/add-contents.component';
import { CreateRecipeComponent } from './../create-recipe/create-recipe.component';
import { RecipesComponent } from './../recipes.component';
import { RecipesRoutingModule } from './../recipes-routing.module';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { RecipeDetailsComponent } from './recipe-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { of } from 'rxjs';
import { Recipe } from '../../../app/common/interfaces/recipe';

describe('RecipeDetailsComponent', () => {
  let component: RecipeDetailsComponent;
  let fixture: ComponentFixture<RecipeDetailsComponent>;

  const activatedRoute = jasmine.createSpyObj('ActivatedRoute', ['']);
  const recipesDataService = jasmine.createSpyObj('RecipesDataService', ['deleteRecipe']);
  const notificator = jasmine.createSpyObj('NotificatorService', ['success', 'error']);
  const modalService = jasmine.createSpyObj('NgbModal', ['open']);
  const location = jasmine.createSpyObj('Location', ['go']);

  // Mock Data
  const nutrition = {
    PROCNT: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    FAT: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    CHOCDF: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    ENERC_KCAL: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    SUGAR: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    FIBTG: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    CA: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    FE: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    P: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    K: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    NA: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    VITA_IU: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    TOCPHA: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    VITD: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    VITC: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    VITB12: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    FOLAC: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    CHOLE: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    FATRN: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    FASAT: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    FAMS: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
    FAPU: {
      description: 'eee',
      unit: 'eee',
      value: 1,
    },
  };

  // Mock Data
  activatedRoute.data = of({
    recipe: {
      id: 'ab5035c0-f411-4868-b20e-e068ac88bbf9',
      title: 'Recipe',
      description: 'Content 1',
      category: 'something',
      products: [],
      recipes: [],
      subrecipes: [],
      nutrition,
      user: 'ivo',
      userID: '4cc8b197-cd03-4abf-9997-5f7a3a292211',
      created: new Date(),
    }
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeDetailsComponent,
        RecipesComponent,
        CreateRecipeComponent,
        AddContentsComponent,
        ItemNutritionComponent,
        RecipeViewComponent,
        TimeAgoPipe,
        TotalNutritionComponent,
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        RecipesRoutingModule,
        AngularStickyThingsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
        {
          provide: RecipesDataService,
          useValue: recipesDataService,
        },
        {
          provide: NotificatorService,
          useValue: notificator,
        },
        {
          provide: NgbModal,
          useValue: modalService,
        },
        {
          provide: Location,
          useValue: location,
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct Recipe', () => {
    expect(component.recipe.id).toBe('ab5035c0-f411-4868-b20e-e068ac88bbf9');
  });

  it('open should call modalService.open once', () => {
    modalService.open.calls.reset();

    component.open('modalWindow');

    expect(modalService.open).toHaveBeenCalledTimes(1);
  });

  it('deleteRecipe should call recipesDataService.deleteRecipe once', () => {
    recipesDataService.deleteRecipe.calls.reset();
    recipesDataService.deleteRecipe.and.returnValue(of('recipe'));

    component.deleteRecipe('recipeId');

    expect(recipesDataService.deleteRecipe).toHaveBeenCalledTimes(1);
  });

  it('deleteRecipe should call notificator.success once', () => {
    notificator.success.calls.reset();
    recipesDataService.deleteRecipe.and.returnValue(of('recipe'));

    component.deleteRecipe('recipeId');

    expect(notificator.success).toHaveBeenCalledTimes(1);
  });
});
