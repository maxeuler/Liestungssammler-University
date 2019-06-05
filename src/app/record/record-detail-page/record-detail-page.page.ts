import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RecordService } from '../record.service';
import { Record } from '../record.model';
import { ViewChild } from '@angular/core';
import { ModulePickerPage } from '../../module/module-picker/module-picker.page';

@Component({
	selector: 'app-record-detail-page',
	templateUrl: './record-detail-page.page.html',
	styleUrls: ['./record-detail-page.page.scss']
})
export class RecordDetailPagePage implements OnInit {
	isEditMode = false;
	pageTitle: string;
	record = new Record(null, null, null, null, null, null, null, null);
	years: number[] = [];

	errors: Map<string, string> = new Map<string, string>();
	selectedModule: any;

	constructor(
		private route: ActivatedRoute,
		private recordService: RecordService,
		private navCtrl: NavController,
		private router: Router,
		private modalController: ModalController
	) {
		const recordId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

		if (recordId) {
			this.isEditMode = true;
			Object.assign(this.record, this.recordService.findById(recordId));
			this.pageTitle = 'Leistung bearbeiten';
		} else {
			this.record.year = new Date().getFullYear();
			this.pageTitle = 'Leistung erstellen';
		}

		this.initYears();
	}
	ngOnInit() {}

	initYears() {
		for (let i = 0; i < 10; i++) {
			this.years.push(new Date().getFullYear() - i);
		}
	}

	@ViewChild('moduleNr')
	private moduleNrRef: IonInput;

	ionViewDidEnter() {
		if (!this.isEditMode) {
			this.moduleNrRef.setFocus();
		}
	}

	save() {
		this.errors.clear();

		console.log(this.record);

		if (!this.record.moduleNr) {
			this.errors.set('moduleNr', 'Modulenummer muss angegeben werden!');
		}
		if (!this.record.moduleName) {
			this.errors.set('moduleName', 'Name muss angegeben werden!');
		}
		if (!this.record.crp) {
			this.errors.set('crp', 'Creditpoints müssen angegeben werden!');
		}
		if (!this.record.mark) {
			this.errors.set('mark', 'Note muss angegeben werden!');
		}

		if (this.errors.size === 0) {
			if (this.isEditMode) {
				this.recordService.update(this.record);
			} else {
				this.recordService.persist(this.record);
			}

			this.navCtrl.pop();
		}
	}

	deleteRecord() {
		if (confirm('Bist du sicher?')) {
			this.recordService.delete(this.record.id);
			this.navCtrl.pop();
		}
	}

	async showModules() {
		const modal = await this.modalController.create({
			component: ModulePickerPage
		});
		await modal.present();
		this.selectedModule = await modal.onDidDismiss();

		if (this.selectedModule) {
			const { nr, name, crp } = this.selectedModule.data;
			console.log(nr, name, crp);
			this.record.moduleNr = nr;
			this.record.moduleName = name;
			this.record.crp = crp;
		}
	}
}
