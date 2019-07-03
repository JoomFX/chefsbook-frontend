import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const routes: Routes = [
  // { path: '', component: PostsComponent, resolve: {posts: PostsResolverService, count: PostCountResolverService} },
  { path: '', component: RecipesComponent },
  { path: 'create', component: CreateRecipeComponent },
  // { path: ':id', component: PostDetailsComponent, resolve: {post: PostDetailsResolverService} },
  { path: ':id', component: RecipeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
