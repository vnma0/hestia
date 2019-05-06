import i18n from 'i18next';

import { reactI18nextModule } from 'react-i18next';
import { translations as resources } from './strings/hestia-l10n/l10n-loader.js';

i18n.use(reactI18nextModule).init({
    resources,
    lng: 'en_US',
    keySeparator: '.',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
