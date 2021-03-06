import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage-angular";

const LNG_KEY = "SELECTED_LANGUAGE";

@Injectable({
	providedIn: "root",
})
export class LanguageService {
	selected = "";

	constructor(private translate: TranslateService, private storage: Storage) {}

	// sets default language as browser language if no other language choice made
	// if language language selected then this value is stored using the ionic storage module
	async setInitialAppLanguage() {
		const language = this.translate.getBrowserLang();
		this.translate.setDefaultLang(language);

    // initialise storage
    await this.storage.create();
    
		this.storage.get(LNG_KEY).then((val: string) => {
			if (val) {
				this.setLanguage(val);
				this.selected = val;
			}
		});
	}

	getLanguages(): Array<{}> {
		return [
			{ text: "English", value: "en", img: "assets/imgs/en.png" },
			{ text: "French", value: "fr", img: "assets/imgs/fr.png" },
			{ text: "Spanish", value: "sp", img: "assets/imgs/sp.png" },
			{ text: "Portuguese", value: "br", img: "assets/imgs/br.png" },
			{ text: "Chinesse", value: "cn", img: "assets/imgs/china.png" },
			{ text: "Arabian", value: "ar", img: "assets/imgs/united-arab-emirates.png" },
			{ text: "Greko", value: "el", img: "assets/imgs/grecia.png" },
			{ text: "Japanesse", value: "ja", img: "assets/imgs/japan.png" },
			{ text: "Korea", value: "ko", img: "assets/imgs/south-korea.png" },
		];
	}

	// lng can be 'en', 'fr' or 'sp'
	setLanguage(lng: string) {
		this.translate.use(lng);
		this.selected = lng;
		this.storage.set(LNG_KEY, lng);
	}
}
