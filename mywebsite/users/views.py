from django.shortcuts import render
from datetime import date

from django.http import HttpResponse
# Create your views here.
def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.isvalid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            password=form.cleaned_data['paswword']

            #authenticate the user
            try:
                user = User.objects.get(email=email,first_name=name)
                user = authenticate(request,username=user.username,password=password)
                if user is not None:
                    login(request,user)
                    return redirect('profile')
                else:
                    form.add_error(None,"Invalid login credentials")

            except User.DoesNotExist:
                form.add_error(None,"User does not exist")

        else:
            form = Loginform()
        
    #return render(request,'login.html')
    return render(request,'users/login.html',{form:'form'})

def home_page(request):
    file_path1 = '/filepath1.txt'
    file_path2 = '/filepath2.txt'
    try:
        with open(file_path1,'r') as file:
            file_content = file.read()
    except FileNotFoundError:
        file_content = "Sorry the content could not be found"
    try:
        with open(filepath2,'r') as file:
            file_content  = file.read()
    except FileNotFoundError:
        file_content = "Sorry the content could not be found"

    return render(request,'users/index.html',{'content': file_content})

def events_gallery(request):
    dict = getEventdetails()
    current_date = date.today()
    for key,val in dict.items():
        date = val#
        if(date.month == current_date.month):
            dict_upcoming = {key:date}
    
    return render(request,'users/events_gallery.html',{'Upcoming events':dict_upcoming})

def contributions(request):
    if(request.METHOD == 'POST'):
        transaction = MoneyPortal(request.POST)
        merchant_details = getMerchantDetails()
        if(transaction.isvalid()):
            user_name = transaction.cleaned_data.get("name")
            user_email = transaction.cleaned_data.get("email")
            user_desig = transaction.cleaned_data.get("designation")
            user_contact = transaction.cleaned_data.get("contact_no")
            user_amount = transaction.cleaned_data.get("amount")
        else:
            print("Form  invalid")

        return render(request,'users/contributions.html',{contributions:transaction})
        

        


        



def appointment_view(request):
    if request.method == 'POST':
        form = AppointmentForm(request.POST)
        if form.isvalid():
            appointment_day = form.cleaned_data['appointment_day']
            appointment_slot = form.cleaned_data['appointment_slot']
            doctor_name  = form.cleaned_data['doctor_name']
            patient_id = form.cleaned_data['patient_id']

            doctors =['AJay','Ashish']
            if doctor_name not in doctors:
                form.add_error('doctor_name','Doctor does not exist in hospital')
            else:
                return HttpResponse("Appointment booked")
            
            return render(request,'users/appointment.html',{form:'form'})
        
            

        

        






