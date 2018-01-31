from datetime import datetime, date, time, timedelta
import calendar
print calendar.isleap(1900)
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, inch, landscape
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.platypus.flowables import PageBreak
import random


doc = SimpleDocTemplate("simple_table_grid.pdf",leftMargin=0.2*inch, rightMargin= 0.2*inch, pagesize=landscape(letter))
lst = [] ##this will contain all the dataframes 



def leapNotLeap(year):
    if calendar.isleap(year):
        return {'week1':[None]*15,'week2':[None]*14 }
    else:
        return {'week1':[None]*15,'week2':[None]*13 }

def returnDateObject(year):
    return {
        1:{'week1':[None]*15,'week2':[None]*16 },
        2: leapNotLeap(year),
        3:{'week1':[None]*15,'week2':[None]*16 },
        4:{'week1':[None]*15,'week2':[None]*15 },
        5:{'week1':[None]*15,'week2':[None]*16 },
        6:{'week1':[None]*15,'week2':[None]*15 },
        7:{'week1':[None]*15,'week2':[None]*16 },
        8:{'week1':[None]*15,'week2':[None]*16 },
        9:{'week1':[None]*15,'week2':[None]*15 },
        10:{'week1':[None]*15,'week2':[None]*16 },
        11:{'week1':[None]*15,'week2':[None]*15 },
        12:{'week1':[None]*15,'week2':[None]*16 }
    }

    

outerStyle = TableStyle([
    ('LEFTPADDING',(0,0),(-1,-1), 0),
    ('RIGHTPADDING',(0,0),(-1,-1), 0)
    
    
    ])


headerStyle = TableStyle([
    ('FONTSIZE', (0, 0), (-1, 1), 8),
    ('BACKGROUND', (0, 0), (4, 0), colors.gray),
    ('INNERGRID', (0, 0), (-1, 0), 0.25, colors.black),
    ('BOX', (0, 0), (-1, -1), 0.25, colors.black)
    
    
    ])


class transmision:
    def __init__(self,order,date):
        ##self.order = order
        self.order = random.randint(0, 5)
        self.date = date


def getStringDay(dayNumber):
    return {
        0:'L',
        1:'M',
        2:'M',
        3:'J',
        4:'V',
        5:'S',
        6:'D'    
    }[dayNumber]
    
def getStringMonth (monthNumber):
    return {
        1:'Enero',
        2:'Febrero',
        3:'Marzo',
        4:'Abril',
        5:'Mayo',
        6:'Junio',
        7:'Julio',
        8:'Agosto',
        9:'Septiembre',
        10:'Octubre',
        11:'Noviembre',
        12:'Diciembre'



    }[monthNumber]

def createWeekTable(week,year,month, nWeek):
    padding = [""] * len(week)
    monthRow = [getStringMonth(month)]*len(week)
    dayNumber = [ x +nWeek*15 for x in range (1, len(week) + 1) ] 
    dayName = [ getStringDay(calendar.weekday(year,month, x)) for x in dayNumber] 
    dayTransmissions = [""] * len(week)
    for day in range(0,len(week)):
        if week[day] != None :
            dayTransmissions[day] = week[day].order
        else:    
            dayTransmissions[day] = ""
    return [monthRow,dayName,dayNumber,padding,padding,padding,dayTransmissions,padding,padding,padding,padding] 

def appendToDateObject(time,arrayDateRange):
    if (time.day<=15):
        arrayDateRange[time.year][time.month]['week1'][time.day-1]=transmision(0,time)
    if (time.day>15):
        print('day:', time.day)
        arrayDateRange[time.year][time.month]['week2'][time.day-16]=transmision(0,time)
    

    return arrayDateRange


def genCalendar(time1,time2):
    dateRange = {}
    timeDelta = time2 - time1
    for i in range(time1.year,time2.year + 1 ,1):
        print (i, time1.year, time2.year)
        dateRange[i] = returnDateObject(i) 


    for z in range(0,timeDelta.days + 1):
        toAppend = time1 + timedelta(days=z)
        dateRange = appendToDateObject(toAppend,dateRange)
    
    print dateRange
    return dateRange


def genReport(time1,time2):
    dt1 = datetime.strptime(time1, "%Y-%m-%d")
    dt2 = datetime.strptime(time2, "%Y-%m-%d")
    calendar = genCalendar(dt1,dt2)
    renderReport(calendar, dt1,dt2)
    

def tabStyle(nColumns):
    return TableStyle([
     ('FONTSIZE', (0, 0), (-1, 1), 8),   
    ('BACKGROUND', (0, 0), (4, 0), colors.gray),
    ('INNERGRID', (0, 0), (-1, -1), 0.25, colors.black),
    ('BOX', (0, 0), (-1, -1), 0.25, colors.black),
    ('ALIGN', (0,0), (-1,0), 'CENTER'),
    ('SPAN', (0,0), (nColumns -1,0 ))
    ])
    

def hasOrders(week):
    for day in week:
        if day !=None:
            print("Returning true")
            return True
    print("Returning false")
    return False

def renderReport( calendar, t1,t2 ):
    
    for year in range(t1.year,t2.year + 1):
        print("year:",year)
        for month in range(1,13):
            if(hasOrders(calendar[year][month]['week1'])):
                x= calendar[year][month]['week1']
                t = Table(createWeekTable (x,year,month,0), colWidths=None, rowHeights=None, style = tabStyle(len(x)))
                ##t = Table([calendar[year][month]['week1']], colWidths=None, rowHeights=None,style = tabStyle )
                lst.append(Table( [[leftSide(),t]] ,colWidths=None, rowHeights=None, style =outerStyle, hAlign='LEFT') )
                lst.append(PageBreak())
                print ("week 1 has orders")
            if(hasOrders(calendar[year][month]['week2'])):
                x= calendar[year][month]['week2']
                t = Table(createWeekTable (x,year,month,1), colWidths=None, rowHeights=None, style = tabStyle(len(x)))
                ##t = Table([calendar[year][month]['week2']], colWidths=None, rowHeights=None, style = tabStyle)
                lst.append(Table( [[leftSide(),t]],colWidths=None, rowHeights=None, style =outerStyle, hAlign ='LEFT' ) )
                lst.append(PageBreak())
                print ("week 2 has orders")
                
    doc.build(lst)

            
            
            
def leftSide():
    header = ["Canal","Tipo de compra","Dur","Costo X Spot","Total Spots","Gasto Total Mensual"]
    body = [""] * len(header)
    something = [""] * len(header)
    something[2] = "Region"
    padding = body = [""] * len(header)
    return Table([header,body,something,padding],colWidths=None, rowHeights=None, style =headerStyle )     

def addOrdersToCalendar(orders,calendar):
    for order in orders:
        print("Hello")
    