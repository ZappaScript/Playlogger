from datetime import datetime, date, time, timedelta
import calendar
print calendar.isleap(1900)


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
            


def genCalendar(time1,time2):
    days = time2-time1
    print days.days


def getDays(time1,time2):
    dt1 = datetime.strptime(time1, "%Y-%m-%d")
    dt2 = datetime.strptime(time2, "%Y-%m-%d")
    print getMaxDaysInMonth(dt1)
    print getMaxDaysInMonth(dt2)
    print (dt1,dt2)
    genCalendar(dt1,dt2)
