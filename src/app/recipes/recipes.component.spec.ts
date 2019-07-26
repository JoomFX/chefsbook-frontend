import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesComponent } from './recipes.component';
import { SharedModule } from '../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipesRoutingModule } from './recipes-routing.module';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { AddContentsComponent } from './add-contents/add-contents.component';
import { ItemNutritionComponent } from './item-nutrition/item-nutrition.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { TotalNutritionComponent } from './total-nutrition/total-nutrition.component';
import { ActivatedRoute } from '@angular/router';
import { RecipesDataService } from './services/recipes-data.service';
import { Location } from '@angular/common';
import { SearchService } from '../core/services/search.service';
import { of } from 'rxjs';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  const recipesDataService = jasmine.createSpyObj('RecipesDataService', ['getRecipes', 'deleteRecipe']);
  const activatedRoute = jasmine.createSpyObj('ActivatedRoute', ['']);
  const location = jasmine.createSpyObj('Location', ['go']);
  const searchService = jasmine.createSpyObj('SearchService', ['emitSearch']);

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
    recipes: {
      recipes: [{
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
      }],
      count: 26,
    },
    categories: [
      { name: 'Appetizers' },
      { name: 'Desserts' },
      { name: 'Main' },
      { name: 'Salads' },
      { name: 'Sides' },
      { name: 'Soups' },
    ],
  });

  // Mock Data
  activatedRoute.queryParamMap = of({
    params: {
      page: 1,
    },
  });

  // Mock Data
  searchService.search$ = of('clearTheSearch');

  // Mock Data
  recipesDataService.getRecipes.and.returnValue(of(
    {
      recipes: [{
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
      }],
      count: 26,
    }
  ));

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
          provide: RecipesDataService,
          useValue: recipesDataService,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
        {
          provide: Location,
          useValue: location,
        },
        {
          provide: SearchService,
          useValue: searchService,
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesComponent);
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

  it('should initialize with the correct data', () => {
    expect(component.recipes[0].id).toBe('ab5035c0-f411-4868-b20e-e068ac88bbf9');
    expect(component.collectionSize).toBe(26);
    expect(component.search).toBe('');
    expect(component.category).toBe('');
  });
});
