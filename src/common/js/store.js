export function save(id, key, value) {
    let seller = window.localStorage._seller_;
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    window.localStorage._seller_ = JSON.stringify(seller)

}
export function load(id, key, localvalue) {
    let seller = window.localStorage._seller_;
    if (!seller) {
        return false;
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            return false;
        }
    }
    return seller[id][key] || localvalue;
}