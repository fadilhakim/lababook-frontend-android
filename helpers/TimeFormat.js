import moment from 'moment'

export function timeInfo(datey) {

    dateySplit = datey.split(" ")
    dds = dateySplit[0].split("-")
    dts = dateySplit[1].split(":")

    const objDate = new Date(dds[0],dds[1]-1,dds[2],dts[0],dts[1],dts[2])

    const todayObj = new Date()

    //console.log(" ==> ",todayObj)

    const days = Math.floor((Date.UTC(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate()) -
    Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) ) /(1000 * 60 * 60 * 24))

    //console.log( objDate.getDate() +" "+objDate+" hari")

    if( days/365 >= 1 ) {
        return Math.floor( days/365 )+" tahun lalu"
    }
    else if( days/30 >= 1 ) {
        return Math.floor( days/30 )+" bulan lalu"
    }
    else if( days == 0) {
        return "baru saja"
    }
    else {
        return days+" hari lalu"
    }
}

export const TimeDiff = (someDate, returnDetail = false) => {
    let dataReturn = {
        value: '',
        status: '',
        year: '0000',
        month: '',
        date: '00',
        day: ''
    }

    const today = moment().format()
    // const b = moment('2020-08-02 12:21:12','YYYY-MM-DD hh:mm:ss')
    const theDate = moment(someDate,'YYYY-MM-DD hh:mm:ss')
    const diffYears = theDate.diff(today, 'years')
    const diffMonths = theDate.diff(today, 'months')
    const diffDays = theDate.diff(today, 'days')

    if (diffYears < 0) {
        dataReturn.value = Math.abs(diffYears) + ' tahun lalu'
        dataReturn.status = 'late'
    } else if (diffYears > 0) {
        dataReturn.value = diffYears + ' tahun lagi'
        dataReturn.status = 'incoming'
    } else if (diffMonths < 0) {
        dataReturn.value = Math.abs(diffMonths) + ' bulan lalu'
        dataReturn.status = 'late'
    } else if (diffMonths > 0) {
        dataReturn.value = diffMonths + ' bulan lagi'
        dataReturn.status = 'incoming'
    } else if (diffDays < 0) {
        dataReturn.value = Math.abs(diffDays) + ' hari lalu'
        dataReturn.status = 'late'
    } else if (diffDays > 0) {
        dataReturn.value = diffDays + ' hari lagi'
        dataReturn.status = 'incoming'
    } else {
        dataReturn.value = 'hari ini'
        dataReturn.status = 'current'
    }

    dataReturn.year = theDate.format('YYYY')
    dataReturn.month = MonthID[theDate.format('M')]
    dataReturn.date = theDate.format('DD')
    dataReturn.day = DayID[theDate.format('dddd').toLowerCase()]

    if (returnDetail)
        return dataReturn
    else
        return dataReturn.value
}

export const MonthID = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
export const DayID = {
    'sunday':       'Minggu',
    'monday':       'Senin',
    'tuesday':      'Selasa',
    'wednesday':    'Rabu',
    'thursday':     'Kamis',
    'friday':       'Jumat',
    'saturday':     'Sabtu'
}
