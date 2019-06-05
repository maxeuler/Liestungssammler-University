import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar } from '@ionic/angular';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { Record } from '../record.model';
import { Stats } from '../stats.model';
import { RecordService } from '../record.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { filterQueryId } from '@angular/core/src/view/util';

@Component({
	selector: 'app-record-list',
	templateUrl: './record-list.page.html',
	styleUrls: ['./record-list.page.scss'],
	providers: [SocialSharing]
})
export class RecordListPage implements OnInit {
	records: Record[] = [];
	statistic: Stats;
	allertCtrl: AlertController;
	recordService: RecordService;
	socialSh: SocialSharing;

	isSearchbarOpen: Boolean;
	filteredRecords: Record[] = [];
	myControl = new FormControl();

	count: number;
	countHalfWeighted: number;
	sumCrp: number;
	missingCrp: number;
	averageGrade: number;

	@ViewChild(IonSearchbar)
	private searchbar: IonSearchbar;

	constructor(
		public alertController: AlertController,
		private router: Router,
		private socialSharing: SocialSharing
	) {
		this.socialSh = new SocialSharing();
		this.isSearchbarOpen = false;
	}

	toggleSearchbar() {
		this.isSearchbarOpen = !this.isSearchbarOpen;
		if (this.isSearchbarOpen) {
			window.setTimeout(() => {
				this.searchbar.setFocus();
			}, 100);
		}
	}

	doSearch() {
		this.filteredRecords = this.records.filter(
			rec =>
				rec.moduleName.toLowerCase().includes(this.searchbar.value) ||
				rec.moduleNr.toLowerCase().includes(this.searchbar.value)
		);
	}

	sendEmail(records: Record[]) {
		const emailBody = records
			.map(
				record =>
					`${record.moduleName} ${record.moduleNr} (${record.mark},${
						record.crp
					})`
			)
			.reduce((a, b) => `${a} \n ${b} \n`);

		this.socialSharing
			.canShareViaEmail()
			.then(() =>
				this.socialSharing.shareViaEmail(emailBody, 'Meine Leistungen', [
					'maxjuliuseuler@gmail.com'
				])
			)
			.then(() => console.log('Success 💯'))
			.catch(err => console.log(`Ooooppps 😮👉🏼 ${err}`));
	}

	ngOnInit() {
		this.fetchRecords();
	}

	ionViewWillEnter() {
		this.fetchRecords();
	}

	fetchRecords() {
		this.recordService = new RecordService();
		this.records = this.recordService.findAll();
		this.filteredRecords = this.records;
	}

	createRecord() {
		this.router.navigate(['record-detail']);
	}

	editRecord(record) {
		this.router.navigate(['record-detail', { id: record.id }]);
	}

	deleteRecord(record) {
		if (confirm('Bist du sicher?')) {
			this.recordService.delete(record.id);
		}
		this.fetchRecords();
	}

	async calcStats() {
		if (!this.records.length) {
			const alert = await this.alertController.create({
				header: 'Statistik',
				message: `Keine Leistungen vorhanden`,
				buttons: ['SCHLIESSEN']
			});

			return alert.present();
		}
		this.count = this.records.length;
		this.countHalfWeighted = this.records.filter(
			record => record.isHalfWeighted
		).length;
		this.sumCrp = this.records
			.map(record => record.crp)
			.reduce((acc, curr) => acc + curr);
		this.missingCrp = 180 - this.sumCrp;
		this.averageGrade = Math.round(
			this.records
				.map(record => record.crp * record.mark)
				.reduce((acc, curr) => acc + curr) / this.sumCrp
		);

		this.statistic = new Stats(
			this.count,
			this.countHalfWeighted,
			this.sumCrp,
			this.missingCrp,
			this.averageGrade
		);

		console.log(this.statistic);
		this.presentStats();
	}

	async presentStats() {
		const message: string = [
			`<li>Anzahl Module: ${this.statistic.count}</li>`,
			`<li>50%-Liestungen: ${this.statistic.countHalfWeighted}</li>`,
			`<li>Summe Crp: ${this.statistic.sumCrp}</li>`,
			`<li>Crp bis Ziel: ${this.statistic.missingCrp}</li>`,
			`<li>Durchschnitt: ${this.statistic.averageGrade}%</li>`
		].join('');

		const alert = await this.alertController.create({
			header: 'Statistik',
			message: `<ul>${message}</ul>`,
			buttons: ['SCHLIESSEN']
		});

		await alert.present();
	}
}
