import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { UpdateRecipeResolverService } from './services/update-recipe-resolver.service';
import { ListRecipesResolverService } from './services/list-recipes-resolver.service';
import { RecipesDetailsResolverService } from './services/recipes-details-resolver.service';
import { CreateRecipeResolverService } from './services/create-recipe-resolver.service';

const routes: Routes = [
  // { path: '', component: PostsComponent, resolve: {posts: PostsResolverService, count: PostCountResolverService} },
  // { path: '', component: RecipesComponent },
  {
    path: '',
    component: RecipesComponent,
    resolve: {recipes: ListRecipesResolverService}
  },
  // { path: 'create', component: CreateRecipeComponent },
  {
    path: 'create',
    component: CreateRecipeComponent,
    resolve: {data: CreateRecipeResolverService}
  },
  {
    path: ':id',
    component: RecipeDetailsComponent,
    resolve: {recipe: RecipesDetailsResolverService},
  },
  {
    path: ':id/update',
    component: CreateRecipeComponent,
    pathMatch: 'full',
    resolve: {recipe: UpdateRecipeResolverService}
  },
  // { path: ':id', component: PostDetailsComponent, resolve: {post: PostDetailsResolverService} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
