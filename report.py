from datetime import datetime, date, time, timedelta
import calendar
print calendar.isleap(1900)
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle

def getMaxDaysInMonth(datetime):
    if datetime.month !=2:
        return {
            1:31,
            3:31,
            4:30,
            5:31,
            6:30,
            7:31,
            8:31,
            9:30,
            10:31,
            11:30,
            12:31
        }[datetime.month]
    else:
        if calendar.isleap (datetime.year):
            return 29
        else:
            return 28
            

def returnDateObject(year):
    return {
        'year':year,
        1:{'week1':[],'week2':[] },
        2:{'week1':[],'week2':[] },
        3:{'week1':[],'week2':[] },
        4:{'week1':[],'week2':[] },
        5:{'week1':[],'week2':[] },
        6:{'week1':[],'week2':[] },
        7:{'week1':[],'week2':[] },
        8:{'week1':[],'week2':[] },
        9:{'week1':[],'week2':[] },
        10:{'week1':[],'week2':[] },
        11:{'week1':[],'week2':[] },
        12:{'week1':[],'week2':[] }
    }


def appendToDateObject(time,arrayDateRange):
    index = 0
    print len(arrayDateRange)
    for i in range(0,len(arrayDateRange)):
        if(arrayDateRange[i]['year'] == time.year):
            index = i
    if (time.day<15):
        arrayDateRange[index][time.month]['week1'].append(time)
    if (time.day>=15):
        arrayDateRange[index][time.month]['week2'].append(time)
    return arrayDateRange


def genCalendar(time1,time2):
    dateRange = []
    timeDelta = time2 - time1
    for i in range(time1.year,time2.year + 1 ,1):
        print (i, time1.year, time2.year)
        dateRange.append ( returnDateObject(i) )


    for z in range(0,timeDelta.days + 1):
        toAppend = time1 + timedelta(days=z)
        dateRange = appendToDateObject(toAppend,dateRange)
    
    print dateRange





def getDays(time1,time2):
    dt1 = datetime.strptime(time1, "%Y-%m-%d")
    dt2 = datetime.strptime(time2, "%Y-%m-%d")
    genCalendar(dt1,dt2)
