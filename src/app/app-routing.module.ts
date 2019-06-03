import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'record-list', pathMatch: 'full' },
	{
		path: 'record-list',
		loadChildren: './record/record-list/record-list.module#RecordListPageModule'
	},
	{
		path: 'record-detail',
		loadChildren:
			'./record/record-detail-page/record-detail-page.module#RecordDetailPagePageModule'
	},
  { path: 'module-picker', loadChildren: './module/module-picker/module-picker.module#ModulePickerPageModule' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
