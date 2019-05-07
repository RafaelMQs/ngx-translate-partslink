import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
	providedIn: 'root'
})
export class LanguageService {
	selected = '';

	constructor(private translate: TranslateService, private storage: Storage) { }

	// sets default language as browser language if no other language choice made
	// if language language selected then this value is stored using the ionic storage module
	setInitialAppLanguage() {
		const language = this.translate.getBrowserLang();
		this.translate.setDefaultLang(language);

		this.storage.get(LNG_KEY).then(val => {
			if (val) {
				this.setLanguage(val);
				this.selected = val;
			}
		});
	}

	getLanguages() {
		return [
			{ text: 'English', value: 'en', img: 'assets/imgs/en.png' },
			{ text: 'French', value: 'fr', img: 'assets/imgs/fr.png' },
			{ text: 'Spanish', value: 'sp', img: 'assets/imgs/sp.png' },
		];
	}

	// lng can be 'en', 'fr' or 'sp'
	setLanguage(lng) {
		this.translate.use(lng);
		this.selected = lng;
		this.storage.set(LNG_KEY, lng);
	}
}
