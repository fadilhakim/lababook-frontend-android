export function numberFormat(num) {
    return "Rp. "+num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}