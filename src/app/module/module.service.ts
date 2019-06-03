import { Injectable } from '@angular/core';
import { Module } from './module.model';
import {
	HttpClient,
	HttpErrorResponse,
	HttpResponse
} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ModuleService {
	static MODULES_URL = 'https://ema-thm.github.io/modules.json';
	modules: Module[];

	constructor(private http: HttpClient) {
		let modulesJSON: string = localStorage.getItem('modules');
		if (modulesJSON) {
			this.modules = JSON.parse(modulesJSON);
		} else {
			// init storage with test data
			this.modules = [];
			// nr, name, crp
			this.modules.push(new Module('CS1019', 'Compilerbau', 6));
			this.save();
		}
	}

	findAll(): Module[] {
		return this.modules;
	}

	private save(): void {
		localStorage.setItem('modules', JSON.stringify(this.modules));
	}

	load() {
		let lastModified = localStorage.getItem('modulesLastModified');
		this.http
			.get<Module[]>(ModuleService.MODULES_URL, {
				observe: 'response',
				headers: lastModified ? { 'If-Modified-Since': lastModified } : {}
			})
			.subscribe(
				(response: HttpResponse<Module[]>) => {
					const newModules = response.body;
					this.modules.splice(0, this.modules.length, ...newModules);
					localStorage.setItem(
						'modulesLastModified',
						response.headers.get('last-modified')
					);
					this.save();
				},
				(error: HttpErrorResponse) => {}
			);
	}
}
