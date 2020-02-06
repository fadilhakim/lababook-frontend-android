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