import { Injectable } from '@angular/core';
import { Record } from './record.model';

@Injectable({
	providedIn: 'root'
})
export class RecordService {
	records: Record[];
	nextRecordId: number;

	constructor() {
		let recordsJSON: string = localStorage.getItem('records');

		if (recordsJSON) {
			this.records = JSON.parse(recordsJSON);
			this.nextRecordId = parseInt(localStorage.getItem('nextRecordId'));
		} else {
			this.records = [];
			this.nextRecordId = 1;
		}
	}

	findAll(): Record[] {
		return this.records;
	}

	persist(record: Record): void {
		record.id = this.nextRecordId++;
		this.records.push(record);
		this.save();
	}

	findById(id: number): Record {
		return this.records.find(record => record.id == id);
	}

	save(): void {
		localStorage.setItem('records', JSON.stringify(this.records));
		localStorage.setItem('nextRecordId', this.nextRecordId.toString());
	}

	delete(id: number): void {
		this.records = this.records.filter(record => record.id != id);
		this.save();
	}

	update(record: Record): void {
		this.records.map(rec => {
			if (rec.id == record.id) {
				rec = { ...record };
			}
		});
	}
}
