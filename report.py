from datetime import datetime, date, time, timedelta
import calendar
##print calendar.isleap(1900)
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter,A4, inch, landscape
from reportlab.platypus.flowables import PageBreak

from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Spacer

#from reportlab import rl_config
from reportlab.lib.styles import PropertySet, getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.platypus.paragraph import Paragraph


import random
import cStringIO

doc = SimpleDocTemplate("simple_table_grid.pdf",leftMargin=0.2*inch, rightMargin= 0.2*inch, pagesize=landscape(letter))
lst = [] ##this will contain all the dataframes 


styleSheet = getSampleStyleSheet()

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
    ('FONTSIZE', (0, 0), (-1, 1), 6),
    ('TOPPADDING', (0,0), (-1,-1), 3),
    ('GRID', (0, 0), (-1, -1), 0.25, colors.black),
    ('BOX', (0, 0), (-1, -1), 0.25, colors.black),

    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('VALIGN', (0,0), (-1,-1), 'BOTTOM'),
    ('SPAN', (0,0), (0,1 )),
    ('SPAN', (1,0), (1,1 )),
    ('SPAN', (2,0), (2,1 )),
    ('SPAN', (3,0), (3,1 )),
    ('SPAN', (4,0), (4,1 )),
    ('SPAN', (5,0), (5,1 )),
    ('SPAN', (0,2), (0,5 )),
    ('SPAN', (1,2), (1,5 )),
    ('SPAN', (2,2), (2,5 )),
    ('SPAN', (3,2), (3,5 )),
    ('SPAN', (4,2), (4,5 )),
    ('SPAN', (5,2), (5,5 )),
    
    
    
    ])


class transmision:
    def __init__(self,order,date):
        ##self.order = order
        self.order = order
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
    dayNumber = [ str(x +nWeek*15) for x in range (1, len(week) + 1) ] 
    dayName = [ getStringDay(calendar.weekday(year,month, int(x))) for x in dayNumber] 
    dayTransmissions = [""] * len(week)
    for day in range(0,len(week)):
        if week[day] != None :
            dayTransmissions[day] = week[day].order
        else:    
            dayTransmissions[day] = ""
    return [monthRow,dayName,dayNumber,padding,padding,padding,dayTransmissions,padding,padding,padding,padding] 

def appendToDateObject(time,arrayDateRange, cantidad=""):
    if (time.day<=15):
        arrayDateRange[time.year][time.month]['week1'][time.day-1]=transmision(cantidad,time)
    if (time.day>15):
        ##print('day:', time.day)
        arrayDateRange[time.year][time.month]['week2'][time.day-16]=transmision(cantidad,time)
    

    return arrayDateRange


def genCalendar(time1,time2):
    dateRange = {}
    timeDelta = time2 - time1
    for i in range(time1.year,time2.year + 1 ,1):
        ##print (i, time1.year, time2.year)
        dateRange[i] = returnDateObject(i) 


    for z in range(0,timeDelta.days + 1):
        toAppend = time1 + timedelta(days=z)
        dateRange = appendToDateObject(toAppend,dateRange)
    
    ##print dateRange
    return dateRange


def genReport(target, data):
    dt1 = datetime.strptime(data['inicio'], "%Y-%m-%d")
    dt2 = datetime.strptime(data['final'], "%Y-%m-%d")
    calendar = genCalendar(dt1,dt2)
    addDays( calendar, data['detalles']['transmisiones'] )
    renderReport(target, calendar, dt1, dt2,data)
    

def tabStyle(nColumns):
    return TableStyle([
     ('FONTSIZE', (0, 0), (-1, 1), 6),
    ('INNERGRID', (0, 0), (-1, -1), 0.25, colors.black),
    ('BOX', (0, 0), (-1, -1), 0.25, colors.black),
    ('ALIGN', (0,0), (-1,0), 'CENTER'),
    ('SPAN', (0,0), (nColumns -1,0 ))
    ])
    
def numberTransmisions(month): ##Fix this crap
    num = 0
    for day in month['week1']:
        if day != None:
            if day.order != "":
                num += 1
    for day in month['week2']:
        if day != None:
            if day.order != "":
                num += 1
    
    return num

def numberTransmisionsWeek(week): ##Fix this crap
    num = 0
    for day in week:
        if day != None:
            if day.order != "":
                num += int (day.order)
    
    return num


def hasOrders(week): ##Fixing this relates to fixing the previous crap, a flag or a counter at creation is more than ENOUGH
    for day in week:
        if day !=None:
            if day.order !="":
            ##print("Returning true")
                return True
    ##print("Returning false")
    return False

def renderReport(target, calendar, t1, t2,data ):
    
    for year in range(t1.year,t2.year + 1):
        ##print("year:",year)
        for month in range(1,13):
            
            if(hasOrders(calendar[year][month]['week1'])):
                x= calendar[year][month]['week1']
                nT = numberTransmisionsWeek(x)           
                t = Table(createWeekTable (x,year,month,0), colWidths=None, rowHeights=16, style = tabStyle(len(x)))
                ##t = Table([calendar[year][month]['week1']], colWidths=None, rowHeights=None,style = tabStyle )
                lst.append(Table( [[leftSide(data,nT),t]] ,colWidths=None, rowHeights=None, style =outerStyle, vAlign='MIDDLE', hAlign='LEFT') )
                lst.append(PageBreak())
                ##print ("week 1 has orders")
            if(hasOrders(calendar[year][month]['week2'])):
                x= calendar[year][month]['week2']
                nT = numberTransmisionsWeek(x)   
                t = Table(createWeekTable (x,year,month,1), colWidths=None, rowHeights=16, style = tabStyle(len(x)))
                ##t = Table([calendar[year][month]['week2']], colWidths=None, rowHeights=None, style = tabStyle)
                lst.append(Table( [[leftSide(data,nT),t]],colWidths=None, rowHeights=None, style =outerStyle, vAlign ='MIDDLE',hAlign='LEFT' ) )
                lst.append(PageBreak())
                ##print ("week 2 has orders")
                
    target.build(lst)

            

def addDays(timeObject,daySet):
    print(daySet)
    for day in daySet:
        print(day)
        toAdd = datetime.strptime(day['dia'], "%Y-%m-%d")
        print(toAdd)
        appendToDateObject( toAdd, timeObject, day['cantidad'] )

        
            
def leftSide(data,nT):
    styleN = styleSheet['Normal']
    
    header = ["Canal","Tipo de compra","Dur","Costo X Spot","Total Spots","Gasto Total"]
    body = [None] * len(header)
    body[0] = Paragraph(data['datosCanal'].nombre,styleN)
    body[1] = Paragraph(data['datosEspecificacion'].nombre,styleN)
    body[3] = Paragraph(str(data['datosEspecificacion'].costo_transmision),styleN)
    body[4] = Paragraph(str(nT), styleN)
    body[5] = Paragraph(str(data['datosEspecificacion'].costo_transmision*nT),styleN)
    print ('length of data.detalles.transmision' ,len(data['detalles']['transmisiones']))
    
    something = [None] * len(header)
    something[2] = "Region"
    padding  = [None] * len(header)
    return Table([header,padding,body,padding,padding,padding,padding,something,padding,padding],colWidths=None, rowHeights=16, style =headerStyle )     

##def addOrdersToCalendar(orders,calendar):
  ##  for order in orders:
        ##print("Hello")
    
def previewPDF(data):
    buf = cStringIO.StringIO()
    doc = SimpleDocTemplate(buf,leftMargin=0.2*inch, rightMargin= 0.2*inch, pagesize=landscape(A4))
    print (data['detalles']['transmisiones'])
    genReport(doc, data)
    ##print('buf',buf.getvalue())
    return buf.getvalue()


def renderPDF(data):
    buf = cStringIO.StringIO()

    doc = SimpleDocTemplate(str(str(data['numeroOrden'])+'.pdf'),leftMargin=0.2*inch, rightMargin= 0.2*inch, pagesize=landscape(A4))
    print (data['detalles']['transmisiones'])
    genReport(doc, data)