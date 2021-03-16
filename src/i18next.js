
import common_en from './translations/en/common.json';
import common_fr from './translations/fr/common.json';
import common_ru from './translations/ru/common.json';
import i18next from 'i18next';

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'en',                              // language to use
    resources: {
        en: {
            common: common_en               // 'common' is our custom namespace
        },       
        fr: {
            common: common_fr
        },
        ru: {
            common: common_ru
        }
    },
});

export default i18next;