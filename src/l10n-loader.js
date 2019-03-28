import vi_VN from './strings/global/vi-VN.json'

let out = {
    vi_VN : {
        display : vi_VN.display,
        resources : vi_VN.resources
    }
}

let supportedLanguages = {
    "vi_VN" : vi_VN.display
}

export { out as translations, supportedLanguages };