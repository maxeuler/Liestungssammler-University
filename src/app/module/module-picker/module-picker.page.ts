import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { ModuleService } from '../module.service';
import { Module } from '../module.model';

@Component({
	selector: 'app-module-picker',
	templateUrl: './module-picker.page.html',
	styleUrls: ['./module-picker.page.scss']
})
export class ModulePickerPage {
	modules: Module[] = [];
	filteredModules: Module[] = [];
	isSearchbarOpen: Boolean;

	@ViewChild(IonSearchbar)
	private searchbar: IonSearchbar;

	constructor(
		private modalController: ModalController,
		private moduleService: ModuleService
	) {
		this.modules = moduleService.findAll();
		this.filteredModules = this.modules;
		this.moduleService.load();
		this.isSearchbarOpen = false;
	}
	ionViewDidEnter() {
		window.setTimeout(() => {
			this.searchbar.setFocus();
		}, 100);
	}

	toggleSearchbar() {
		// this.isSearchbarOpen = !this.isSearchbarOpen;
		// if (this.isSearchbarOpen) {
		// 	window.setTimeout(() => {
		// 		this.searchbar.setFocus();
		// 	}, 100);
		// }
	}

	doSearch() {
		this.filteredModules = this.modules.filter(
			m =>
				m.name.toLowerCase().includes(this.searchbar.value) ||
				m.nr.includes(this.searchbar.value)
		);
	}
	clearSearchbar() {
		this.searchbar.value = '';
		this.filteredModules = this.modules;
	}
}
