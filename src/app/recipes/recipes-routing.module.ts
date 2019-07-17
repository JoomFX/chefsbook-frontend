import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { UpdateRecipeResolverService } from './services/update-recipe-resolver.service';
import { ListRecipesResolverService } from './services/list-recipes-resolver.service';

const routes: Routes = [
  // { path: '', component: PostsComponent, resolve: {posts: PostsResolverService, count: PostCountResolverService} },
  // { path: '', component: RecipesComponent },
  {
    path: '',
    component: RecipesComponent,
    resolve: {recipes: ListRecipesResolverService}
  },
  { path: 'create', component: CreateRecipeComponent },
  { path: ':id', component: RecipeDetailsComponent },
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
