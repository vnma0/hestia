import vi_VN from './strings/global/vi-VN.json';
import en_US from './strings/global/en-US.json';

let out = {
    vi_VN: {
        display: vi_VN.display,
        resources: vi_VN.resources
    },
    en_US: {
        display: en_US.display,
        resources: en_US.resources
    }
};

let supportedLanguages = {
    vi_VN: vi_VN.display,
    en_US: en_US.display
};

export { out as translations, supportedLanguages };
