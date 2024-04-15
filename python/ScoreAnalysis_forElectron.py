import csv
import datetime
import sys

arg0 = sys.argv[0]
parameters = {
"year_lower": sys.argv[1],
"year_upper" : sys.argv[2],
"baseline_lower" : sys.argv[3],
"baseline_upper" : sys.argv[4],
"section_baseline_lower" : sys.argv[5],
"section_baseline_upper ": sys.argv[6],
"min_hours" : sys.argv[7],
"min_tests" : sys.argv[8],
"exclude_without_baseline ": sys.argv[9],
"exclude_incomplete ": sys.argv[10],
"name" : sys.argv[11]
}
filePath = sys.argv[12]
saveDir = sys.argv[13]
saveReportPath = saveDir + '/report.csv';
print("inputs:", parameters, filePath )

students = []
student_counts = []
hours_counts = []
students_with_only_one_and_no_baseline = [0]
hour_minimum = 0
num_ACT_only = 0 
num_SAT_only = 0 

#Variables for spreadsheet
class Data:
    
    def __init__(self):
        self.av_section_improvement = []
        self.improvement_all = []
        self.improvement_if_SAT_only = []
        self.improvement_if_ACT_only = []
        self.improvement_if_both = []
        self.improvement_by_hours = []
        self.higher_verbal_analysis = []
        self.higher_math_analysis = []
        self.percent_improvement = []
        self.student_section_improvement = []
        self.section_improvement = []
        
        self.calculate()
        self.calc_av_section_improvement()
        self.calculate_all()
        self.calculate_SAT_only()
        self.calculate_ACT_only()
        self.calculate_both()
        self.calculate_hours()
        self.verbal_analysis(0,0)
        self.math_analysis(0,0)
        self.verbal_analysis(50,0)
        self.math_analysis(50,0)
        self.verbal_analysis(50,50)
        self.math_analysis(50,50)
        self.improvement_analysis()
        self.calc_section_improvement()
        
    def calculate(self):
        self.numstudents = len(students)
        self.totalhours = self.sum_hours()
        self.av_hours_per_student = self.totalhours/self.numstudents
        self.av_baseline = self.calc_av_baseline()
        self.av_verbal_baseline = self.calc_av_verbal_baseline()
        self.av_math_baseline = self.calc_av_math_baseline()
        
    def calc_av_section_improvement(self):
        verbal_sum = 0
        math_sum = 0
        n = 0
        for student in students:
            if student.growth() != "Only One Test":
                n+=1
                verbal_sum+=student.verbal_growth()
                math_sum+=student.math_growth()
                #print(student.math_growth())
        #print("verbal sum" + str(verbal_sum))
        #print("math sum" + str(math_sum))
        self.av_section_improvement.append("{:.0f}".format((float)(verbal_sum)/n))
        self.av_section_improvement.append("{:.0f}".format((float)(math_sum)/n))
        self.av_section_improvement.append("{:.0f}".format(((float)(math_sum)/n)+(float)(verbal_sum)/n))    

    def calculate_all(self):
        self.improvement_all.append(av_total_growth_if_x_tests(students, 1))
        self.improvement_all.append(av_total_growth_if_x_tests(students, 2))
        self.improvement_all.append(av_total_growth_if_x_tests(students, 3))
        self.improvement_all.append(av_total_growth_if_x_tests(students, 4))
        self.improvement_all.append(av_total_growth_if_x_tests(students, 5))
        self.improvement_all.append(av_total_growth_if_x_tests(students, 6))
        self.improvement_all.append(av_growth_all_students(students))
        

    def calculate_SAT_only(self):
        self.improvement_if_SAT_only.append(av_total_growth_if_x_tests(SAT_only_students, 1))
        self.improvement_if_SAT_only.append(av_total_growth_if_x_tests(SAT_only_students, 2))
        self.improvement_if_SAT_only.append(av_total_growth_if_x_tests(SAT_only_students, 3))
        self.improvement_if_SAT_only.append(av_total_growth_if_x_tests(SAT_only_students, 4))
        self.improvement_if_SAT_only.append(av_total_growth_if_x_tests(SAT_only_students, 5))
        self.improvement_if_SAT_only.append(av_total_growth_if_x_tests(SAT_only_students, 6))
        self.improvement_if_SAT_only.append(av_growth_all_students(SAT_only_students))
        
    def calculate_ACT_only(self):
        self.improvement_if_ACT_only.append(av_total_growth_if_x_tests(ACT_only_students, 1))
        self.improvement_if_ACT_only.append(av_total_growth_if_x_tests(ACT_only_students, 2))
        self.improvement_if_ACT_only.append(av_total_growth_if_x_tests(ACT_only_students, 3))
        self.improvement_if_ACT_only.append(av_total_growth_if_x_tests(ACT_only_students, 4))
        self.improvement_if_ACT_only.append(av_total_growth_if_x_tests(ACT_only_students, 5))
        self.improvement_if_ACT_only.append(av_total_growth_if_x_tests(ACT_only_students, 6))
        self.improvement_if_ACT_only.append(av_growth_all_students(ACT_only_students))
        
    def calculate_both(self):
        self.improvement_if_both.append(av_total_growth_if_x_tests(both_tests_students, 1))
        self.improvement_if_both.append(av_total_growth_if_x_tests(both_tests_students, 2))
        self.improvement_if_both.append(av_total_growth_if_x_tests(both_tests_students, 3))
        self.improvement_if_both.append(av_total_growth_if_x_tests(both_tests_students, 4))
        self.improvement_if_both.append(av_total_growth_if_x_tests(both_tests_students, 5))
        self.improvement_if_both.append(av_total_growth_if_x_tests(both_tests_students, 6))
        self.improvement_if_both.append(av_growth_all_students(both_tests_students))
    
    def calculate_hours(self):
        self.improvement_by_hours.append(av_growth_between_x_and_y_hours(1,19.9))
        self.improvement_by_hours.append(av_growth_between_x_and_y_hours(20,39.9))
        self.improvement_by_hours.append(av_growth_between_x_and_y_hours(40,59.9))
        self.improvement_by_hours.append(av_growth_between_x_and_y_hours(60,1000))
        self.improvement_by_hours.append("-")
        self.improvement_by_hours.append(av_growth_between_x_and_y_hours(1,9.9))
        self.improvement_by_hours.append(av_growth_between_x_and_y_hours(10,19.9))
        self.improvement_by_hours.append(av_growth_between_x_and_y_hours(20,29.9))
        self.improvement_by_hours.append(av_growth_between_x_and_y_hours(30,39.9))
        self.improvement_by_hours.append(av_growth_between_x_and_y_hours(40,49.9))
        self.improvement_by_hours.append(av_growth_between_x_and_y_hours(50,59.9))
        self.improvement_by_hours.append(av_growth_between_x_and_y_hours(60,1000))
     
    def verbal_analysis(self, start, end):
        students_with_higher_verbal_bl = []
        total = 0
        for student in students:
            verbal_score = student.tests[0].verbal
            math_score = student.tests[0].math
            if verbal_score > (math_score +start) and len(student.tests)>1:
                students_with_higher_verbal_bl.append(student)
        #print(students_with_higher_verbal_bl)
        total = len(students_with_higher_verbal_bl)  
        count_higher_verbal = 0 
        count_higher_math = 0 
        count_better_ACT = 0
        count_better_SAT = 0
        for student in students_with_higher_verbal_bl:
            if student.max_score_verbal>(student.max_score_math + end):
                count_higher_verbal+=1
            if student.max_score_math>(student.max_score_verbal + end):
                count_higher_math+=1  
            if  student.better_act_by_x(end):
                count_better_ACT+=1
            if  student.better_sat_by_x(end):
                count_better_SAT+=1
        
        if total == 0:
            self.higher_verbal_analysis.append("none")
            self.higher_verbal_analysis.append("none")
            self.higher_verbal_analysis.append("none")
            self.higher_verbal_analysis.append("none")
            
        else:
            self.higher_verbal_analysis.append("{:.0f}".format((float)(count_higher_verbal)/total*100))
            self.higher_verbal_analysis.append("{:.0f}".format((float)(count_higher_math)/total*100))
            self.higher_verbal_analysis.append("{:.0f}".format((float)(count_better_ACT)/total*100))
            self.higher_verbal_analysis.append("{:.0f}".format((float)(count_better_SAT)/total*100))
        
    def math_analysis(self, start, end):
        students_with_higher_math_bl = []
        total = 0
        for student in students:
            verbal_score = student.tests[0].verbal
            math_score = student.tests[0].math
            if (verbal_score+start) < math_score and len(student.tests)>1:
                students_with_higher_math_bl.append(student)
        #print(students_with_higher_math_bl)
        total = len(students_with_higher_math_bl)  
        count_higher_verbal = 0 
        count_higher_math = 0 
        count_better_ACT = 0
        count_better_SAT = 0
        for student in students_with_higher_math_bl:
            if student.max_score_verbal>(student.max_score_math+end):
                count_higher_verbal+=1
            if student.max_score_math>(student.max_score_verbal + end):
                count_higher_math+=1  
            if  student.better_act_by_x(end):
                count_better_ACT+=1
            if  student.better_sat_by_x(end):
                count_better_SAT+=1
                
        if total == 0:
            self.higher_math_analysis.append("none")
            self.higher_math_analysis.append("none")
            self.higher_math_analysis.append("none")
            self.higher_math_analysis.append("none")
        else:
            self.higher_math_analysis.append("{:.0f}".format((float)(count_higher_verbal)/total*100))
            self.higher_math_analysis.append("{:.0f}".format((float)(count_higher_math)/total*100))
            self.higher_math_analysis.append("{:.0f}".format((float)(count_better_ACT)/total*100))
            self.higher_math_analysis.append("{:.0f}".format((float)(count_better_SAT)/total*100))
         
    def improvement_analysis(self):
        count = 0 
        n = 0
        
        for student in students:
            if student.growth() != "Only One Test":
                n+=1
        
        for student in students:       
            if student.growth()>=100 and student.growth() != "Only One Test":
                #print(student.lname, student.growth())
                count+=1
        #print("number greater than 100: " + str(count))
        self.percent_improvement.append("{:.0f}".format((float)(count)/n*100))
        
        count = 0     
        for student in students:     
            if student.growth()>=200 and student.growth() != "Only One Test":
                count+=1
        #print("number greater than 200: " + str(count))
        self.percent_improvement.append("{:.0f}".format((float)(count)/n*100))
            
        count = 0 
        for student in students:     
            if student.growth()>=300 and student.growth() != "Only One Test":
                count+=1
        #print("number greater than 300: " + str(count))
        self.percent_improvement.append("{:.0f}".format((float)(count)/n*100))
        
        count = 0 
        for student in students:     
            if student.growth()>=400 and student.growth() != "Only One Test":
                count+=1
        #print("number greater than 400: " + str(count))
        self.percent_improvement.append("{:.0f}".format((float)(count)/n*100))
                 
        
    def sum_hours(self):
        sum = 0
        for student in students:
            sum+=student.tutoring_hours
        return sum
    
    def calc_av_baseline(self):
        sum = 0
        count = 0
        for student in students:
            if student.has_baseline:
                sum+=student.baseline_score
                count+=1
        print("Average Baseline: "+ str(sum/count))
        return sum/count
          
          
    def calc_av_verbal_baseline(self):
        sum = 0
        count = 0
        for student in students:
            if student.has_baseline:
                sum+=student.baseline_score_verbal
                count+=1
        print("Average Verbal Baseline: "+ str(sum/count))
        return sum/count
    
    def calc_av_math_baseline(self):
        sum = 0
        count = 0
        for student in students:
            if student.has_baseline:
                sum+=student.baseline_score_math
                count+=1
        print("Average Math Baseline: "+ str(sum/count))
        return sum/count

    def calc_section_improvement(self):
        count = 0 
        n = 0
        
        for student in students:
            if student.growth() != "Only One Test":
                n+=1
        
        for student in students:
            if student.growth() != "Only One Test" and student.math_growth() >= 100:
                count+=1
            elif student.growth() != "Only One Test" and student.verbal_growth() >= 100:
                count+=1
        self.student_section_improvement.append("{:.0f}".format((float)(count)/n*100)) 
        
        count = 0
        for student in students:
            if student.growth() != "Only One Test" and student.math_growth() >= 200:
                count+=1
            elif student.growth() != "Only One Test" and student.verbal_growth() >= 200:
                count+=1
        self.student_section_improvement.append("{:.0f}".format((float)(count)/n*100))
        
        count = 0
        for student in students:
            if student.growth() != "Only One Test" and student.math_growth() >= 100:
                count+=1
            if student.growth() != "Only One Test" and student.verbal_growth() >= 100:
                count+=1
        self.section_improvement.append("{:.0f}".format((float)(count)/(n*2)*100))      
        
        count = 0 
        for student in students:
            if student.growth() != "Only One Test" and student.math_growth() >= 200:
                count+=1
            if student.growth() != "Only One Test" and student.verbal_growth() >= 200:
                count+=1
        self.section_improvement.append("{:.0f}".format((float)(count)/(n*2)*100))           
     
class Test:

    def __init__(self, type, date, baseline, verbal, math, composite):
        self.type = type
        if date == "0000-00-00":
            date = "0001-01-01"
        self.date = datetime.datetime.strptime(date, '%Y-%m-%d')
        #print("Test Date: ", self.date.date())
       # print(self.type)
        if verbal != '':
            self.verbal = int(verbal)
        else:
            self.verbal = 0
            #print("Found empty verbal score")
        if math != '':
            self.math = int(math)
        else:
            self.math = 0
           # print("Found empty math score")
        
        self.composite = int(float(composite))
        
        
        if baseline.strip() == 'Baseline':
            self.baseline = True
            #print("FOUND!!!!")
        else:
            self.baseline = False  
        #self.setcomposite(verbal, math)
        
    def setcomposite(self, verbal, math):
        self.composite = int(verbal)+int(math)     
        
class Student:
    
    has_baseline = False
    baseline_score = False
    completion = True
    
    baseline_score_verbal = 0
    baseline_score_math = 0 
    
    max_score = 0
    max_score_verbal = 0
    max_score_math = 0
    
    max_score_ACT = 0
    max_score_ACT_verbal = 0
    max_score_ACT_math = 0
    
    max_score_SAT = 0
    max_score_SAT_verbal = 0
    max_score_SAT_math = 0
    
    num_tests = 0   #DOES NOT INCLUDE BASELINE
    better_test_SAT = False
    better_test_ACT = False
    
    def __init__(self, lname, fname, tests, gradyear, numtests, tutoring_hours, completion):
        self.fname = fname
        self.lname = lname
        if completion == "Incomplete":
            self.completion = False
        self.tests = tests
        self.gradyear = (int)(gradyear)
        self.num_tests = 0
        if tutoring_hours == "":
            tutoring_hours = 0
        self.tutoring_hours = int(float(tutoring_hours))
        self.order_tests()
        self.update_baseline()
        self.update_max()
        
    def __repr__(self):
        self.update_baseline()
        self.update_max()
        student_info = "\n\n" + self.lname + "," + self.fname + "\nGrad year: " + str(self.gradyear) + "\nTutoring Hours: " + str(self.tutoring_hours) + "\n"
        for test in self.tests:
            if test.baseline:
                student_info += "Baseline\t" 
            else:
                student_info += "Test\t\t"
            student_info = student_info + test.type
            # if test.type == 'SAT ' or test.type == "ACT ":
            #     student_info = student_info + '\t'
            student_info = student_info + "\tV:" + str(test.verbal) + "  M:" + str(test.math) + "  Comp:" + str(test.composite) + "\n"
        student_info = student_info + "Growth: " + str(self.growth())
        student_info = student_info + "\nNumber of non-baseline tests: " + str(self.num_tests)
        student_info = student_info + "\nVerbal growth: " + str(self.verbal_growth())
        student_info = student_info + "\nMath growth: " + str(self.math_growth())
        student_info = student_info + "\nBest test type: "
        if self.better_test_ACT:
            student_info = student_info + "ACT"
        elif self.better_test_SAT:
            student_info = student_info + "SAT"
        else:  
            student_info = student_info + "neither"  

        student_info += '\n'
        return student_info
       
    def add_test(self, test): 
        self.tests.append(test)  
        if test.baseline == False:
            self.num_tests+=1
        
    def growth(self):
        self.update_baseline()
        self.update_max()
        growth = 0
        if len(self.tests)<2:
            return "Only One Test"
        if self.baseline_score is False:
            growth = self.max_score - self.tests[0].composite
            if growth<0:
                return 0
            else:
                return growth
        growth = self.max_score - self.baseline_score
        if growth <0:
            return 0
        else:
            return growth
         
    def math_growth(self):
        growth = 0
        if len(self.tests)<2:
            return "Only One Test"
        else:
            growth = self.max_score_math - self.baseline_score_math
            if growth<0:
                return 0
            else:
                return growth
        
    def verbal_growth(self):
        growth = 0
        if len(self.tests)<2:
            return "Only One Test"
        else:
            growth = self.max_score_verbal - self.baseline_score_verbal
            if growth<0:
                return 0
            return growth
    
    def update_baseline(self):
        self.update_max()
        for test in self.tests:
            if test.baseline:
                self.baseline_score = test.composite  
                #print("!!!!!")
                self.has_baseline = True
                self.baseline_score_math = test.math
                self.baseline_score_verbal = test.verbal
        self.update_max()
        if self.has_baseline == False and len(self.tests)>0:
            self.baseline_score_math = self.tests[0].math
            self.baseline_score_verbal = self.tests[0].verbal
                
                
    def update_max(self):
        for test in self.tests:
            if test.type == "ACT ":
                if test.math > self.max_score_ACT_math:
                    self.max_score_ACT_math = test.math
                if test.verbal > self.max_score_ACT_verbal:
                    self.max_score_ACT_verbal = test.verbal
                self.max_score_ACT = self.max_score_ACT_math + self.max_score_ACT_verbal
            if test.type == "SAT ":
                if test.math > self.max_score_SAT_math:
                    self.max_score_SAT_math = test.math
                if test.verbal > self.max_score_SAT_verbal:
                    self.max_score_SAT_verbal = test.verbal
                self.max_score_SAT = self.max_score_SAT_math + self.max_score_SAT_verbal    
        if self.max_score_SAT > self.max_score_ACT:
            self.max_score = self.max_score_SAT   
            self.max_score_math = self.max_score_SAT_math
            self.max_score_verbal = self.max_score_SAT_verbal
            self.better_test_SAT = True
            self.better_test_ACT = False
        else:
            self.max_score = self.max_score_ACT  
            self.max_score_math = self.max_score_ACT_math
            self.max_score_verbal = self.max_score_ACT_verbal
            self.better_test_SAT = False
            self.better_test_ACT = True
                
    def better_act_by_x(self, x):
        self.update_max()
        if self.max_score_ACT > (self.max_score_SAT + x): 
            return True 
        else:
            return False
        
    def better_sat_by_x(self, x):
        self.update_max()
        if self.max_score_SAT > (self.max_score_ACT + x): 
            return True 
        else:
            return False
                
    def total_scores(self):
        total = 0
        for test in self.tests:
            total+=test.composite
        return total    
          
    def order_tests(self):
        ordered_list = []
        baseline_found = False
        index = 0
        
        while(not baseline_found and index < len(self.tests)):
            if self.tests[index].baseline:
                ordered_list.append(self.tests.pop(index))
                baseline_found = True
            index+=1  
            
        while(len(self.tests)>0):  
            earliest_test_index = 0
            for i in range(len(self.tests)):
                if self.tests[i].date<self.tests[earliest_test_index].date:
                    earliest_test_index = i      
            ordered_list.append(self.tests.pop(earliest_test_index))   
                       
        self.tests = ordered_list
    
    def growth_between(self, testnum1, testnum2): 
        self.order_tests()
        if len(self.tests)<2:
            return None
        elif testnum2 > len(self.tests)-1 or testnum1 > len(self.tests)-1:
            return None
        else:
            return self.tests[testnum2].composite -  self.tests[testnum1].composite
                         
    def all_ACT(self):
        for test in self.tests:
            if test.type == "SAT ":
                return False  
        return True 
    
    def all_SAT(self):
        for test in self.tests:
            if test.type == "ACT ":
                return False  
        return True      
        
def student_exists(fname, lname):
    for student in students:
        if lname == student.lname:
            if fname == student.fname:
                return True
    return False 

def get_student(fname, lname):
    for student in students:
        if lname == student.lname:
            if fname == student.fname:
                return student   

def av_growth_between_x_and_y(students, x, y):
    sum = 0
    count = 0
    for student in students:
        if (student.growth_between(x,y)):
            sum+=student.growth_between(x,y)
            count += 1
    if count>0:
        return sum/count
    else:
        return None

def av_growth_if_only_ACT(students):
    #print("Students who took only the ACT:")
    total_growth = 0
    num_students = 0
    global num_ACT_only
    for student in students:
        if student.all_ACT() and student.growth() != "Only One Test":
            #print(student.fname, student.growth())
            total_growth += student.growth()
            num_students+=1
    num_ACT_only = num_students
    if num_students>0:
        return total_growth/num_students     
    else:
        return None 
    
def av_growth_if_only_SAT(students):
   # print("Students who took only the SAT:")
    total_growth = 0
    num_students = 0
    global num_SAT_only
    for student in students:
        if student.all_SAT() and student.growth() != "Only One Test":
            #print(student.fname, student.growth())
            total_growth += student.growth()
            num_students+=1
    num_SAT_only = num_students
    if num_students>0:
        return total_growth/num_students     
    else:
        return None 
    
def av_growth_if_both(students):
    #print("Students who took both:")
    total_growth = 0
    num_students = 0
    for student in students:
        if not student.all_SAT() and not student.all_ACT() and student.growth() != "Only One Test":
            #print(student.fname, student.growth())
            total_growth += student.growth()
            num_students+=1
    if num_students>0:
        return total_growth/num_students     
    else:
        return None 
    
def av_total_growth_if_x_tests(studentlist, x):
    #print("Students with " + str(x)+ " tests are: ")
    total_growth = 0
    num_students = 0
    total_hours = 0
    for student in studentlist:
        total_tests_for_student = student.num_tests
        if student.baseline_score is not False:
            total_tests_for_student+=1 
        if total_tests_for_student == x+1:
            #print(student.fname, student.lname, student.growth())
            total_growth+=student.growth()
            num_students+=1
            total_hours+=student.tutoring_hours
    student_counts.append(num_students)
    if num_students>0: 
        hours_counts.append(total_hours/num_students)       
        return total_growth/num_students  #, num_students 
    else:
        hours_counts.append(0)
        return "none"         
 
def print_all_students():
    #print("Loaded Students:")
    for student in students:
        pass
        #print("\t"+student.fname + ", " + student.lname) 

def num_without_baseline():
    count_missing = 0
    for student in students:
        found = False
        for test in student.tests:
            if test.baseline:
                found = True
        if not found:
            count_missing+=1
    return count_missing     
            
def load_student_data():
    
    with open(filePath) as sheet:
        x=0
        for line in sheet.readlines():
            if x == 0:
                x=1
                continue
            
            try:
            
                splitline = line.split(",")
               
                test = Test(splitline[6], splitline[7], splitline[8], splitline[9], splitline[10], splitline[11])
                
                fname = splitline[1]
                lname = splitline[0]
                completion = splitline[2]
                gradyear = splitline[3]
                numtests = splitline[4]
                
                tutoring_hours = splitline[5]
                if student_exists(fname, lname):
                    
                    current_student = get_student(fname, lname)
                else:
                    
                    current_student = Student(lname, fname, [], gradyear, numtests, tutoring_hours, completion)
                    students.append(current_student)
                current_student.add_test(test)
            except:
                print("Found error", line)    
        
    for student in students:
        student.order_tests() 
        
def print_students_without_baselines():
    count_have = 0
    count_missing = 0
    print("STUDENTS WITHOUT BASELINES")
    for student in students:
        found = False
        for test in student.tests:
            if test.baseline:
                found = True
                count_have +=1
        if not found:
            print(student.lname + ", " + student.fname)
            count_missing+=1
    print("Total baselines: ") + str(count_have)
    print("Total missing baselines: " + str(count_missing))        

def av_growth_all_students(studentset):
    total_growth = 0
    total_students_growth = 0
    students_with_one = 0
    total_hours = 0
    for student in studentset:
        if student.growth() == "Only One Test":
            students_with_one += 1
            continue
        else:
            total_growth += student.growth()
            total_students_growth+=1
            total_hours+=student.tutoring_hours
    students_with_only_one_and_no_baseline[0] += students_with_one
    student_counts.append(total_students_growth)
    student_counts.append("-")
    
    if total_students_growth >0:
        hours_counts.append(total_hours/total_students_growth)
        hours_counts.append("-")
    else:
        hours_counts.append(0)   
        hours_counts.append("-")
        
    if total_students_growth == 0:
        return None
    return total_growth/total_students_growth

def av_growth_between_x_and_y_hours(x,y):
    num_students = 0
    total_growth = 0
    total_hours=0
    for student in students:
        if student.tutoring_hours >= x and student.tutoring_hours <= y and student.growth()!="Only One Test":
            num_students+=1 
            total_hours+=student.tutoring_hours
           
            #print(x, y, student.fname, student.tutoring_hours)
            total_growth+=student.growth()
    student_counts.append(num_students)
    if num_students>0:
        hours_counts.append(total_hours/num_students)
        return total_growth/num_students    
    else:
        hours_counts.append(0)
        return "No students"    

def verbal_report():
    students_with_higher_verbal_bl = []
    total = 0
    for student in students:
        verbal_score = student.tests[0].verbal
        math_score = student.tests[0].math
        if verbal_score > math_score and len(student.tests)>1:
            students_with_higher_verbal_bl.append(student)
    #print(students_with_higher_verbal_bl)
    total = len(students_with_higher_verbal_bl)  
    count_higher_verbal = 0 
    count_higher_math = 0 
    count_better_ACT = 0
    count_better_SAT = 0
    for student in students_with_higher_verbal_bl:
        if student.max_score_verbal>student.max_score_math:
            count_higher_verbal+=1
        if student.max_score_math>student.max_score_verbal:
            count_higher_math+=1  
        if  student.better_test_ACT:
            count_better_ACT+=1
        if  student.better_test_SAT:
            count_better_SAT+=1
            
    print("  "+"{:.0f}".format((float)(count_higher_verbal)/total*100) + "% had a higher verbal score on their best test")
    print("  ""{:.0f}".format((float)(count_higher_math)/total*100) + "% had a higher math score on their best test")
    print("  "+"{:.0f}".format((float)(count_better_ACT)/total*100) + "% did better on the ACT")
    print("  "+"{:.0f}".format((float)(count_better_SAT)/total*100) + "% did better on the SAT")         
             
def math_report():
    students_with_higher_math_bl = []
    total = 0
    for student in students:
        verbal_score = student.tests[0].verbal
        math_score = student.tests[0].math
        if verbal_score < math_score and len(student.tests)>1:
            students_with_higher_math_bl.append(student)
    #print(students_with_higher_math_bl)
    total = len(students_with_higher_math_bl)  
    count_higher_verbal = 0 
    count_higher_math = 0 
    count_better_ACT = 0
    count_better_SAT = 0
    for student in students_with_higher_math_bl:
        if student.max_score_verbal>student.max_score_math:
            count_higher_verbal+=1
        if student.max_score_math>student.max_score_verbal:
            count_higher_math+=1  
        if  student.better_test_ACT:
            count_better_ACT+=1
        if  student.better_test_SAT:
            count_better_SAT+=1
            
    print("  "+"{:.0f}".format((float)(count_higher_verbal)/total*100) + "% had a higher verbal score on their best test")
    print("  ""{:.0f}".format((float)(count_higher_math)/total*100) + "% had a higher math score on their best test")
    print("  "+"{:.0f}".format((float)(count_better_ACT)/total*100) + "% did better on the ACT")
    print("  "+"{:.0f}".format((float)(count_better_SAT)/total*100) + "% did better on the SAT")        
               

# Removes all students who don't fit in the paramters
def slice_data():

  print('Slicing data')

  grad_year_min = int(parameters["year_lower"])
  grad_year_max = int(parameters["year_upper"])

  print('grad_year_min:', type(grad_year_min))

  to_remove_years = []

  for student in students:
      if student.gradyear < grad_year_min:
          to_remove_years.append(student)
      elif student.gradyear > grad_year_max:
          to_remove_years.append(student)
          
  for student in to_remove_years:
      students.remove(student) 
      print("REMOVED",student.fname, student.gradyear)
          


  hour_minimum = int(parameters["min_hours"])

  to_remove = []

  for student in students:
      if student.tutoring_hours < hour_minimum:
          to_remove.append(student) 
        
  for student in to_remove:
      students.remove(student) 
      print("REMOVED",student.fname, student.tutoring_hours)
      
      
      
  baseline_max = int(parameters["baseline_upper"])  

  to_remove_2 = []

  for student in students:
      if student.tests[0].composite > baseline_max:
          print("REMOVED",student.fname, student.tests[0].composite)
          to_remove_2.append(student)
          
      #else:
        #print("KEPT", student.fname, student.tutoring_hours)    
        
  for student in to_remove_2:
      students.remove(student)  
      

  baseline_min = int(parameters["baseline_lower"])    
      
  to_remove_b = []    

  for student in students:
      if student.tests[0].composite < baseline_min:
          print("REMOVED",student.fname, student.tests[0].composite)
          to_remove_b.append(student)
          
  for student in to_remove_b:
      students.remove(student)        
        
  section_baseline_max = int(parameters["section_baseline_upper "])     
      
  to_remove_a = []

  for student in students:
      student.update_baseline()
      student.order_tests()
      if student.baseline_score_math > section_baseline_max:
          print("REMOVED FOR SECTION MAX", student.fname, student.tests[0].math)
          to_remove_a.append(student)  
      elif student.baseline_score_verbal > section_baseline_max:
          print("REMOVED FOR SECTION MAX", student.fname, student.tests[0].verbal)
          to_remove_a.append(student)  

  for student in to_remove_a:
      students.remove(student)  

  # TODO: Add section baseline lower

  section_baseline_min = int(parameters["section_baseline_lower"])

  to_remove_c = []

  for student in students:
      if student.baseline_score_math < section_baseline_min:
          print("REMOVED FOR SECTION MIN", student.fname, student.tests[0].math)
          to_remove_c.append(student)  
      elif student.baseline_score_verbal < section_baseline_min:
          print("REMOVED FOR SECTION MIN", student.fname, student.tests[0].verbal)
          to_remove_c.append(student)  

  for student in to_remove_c:
      students.remove(student)  
      

  test_min = int(parameters["min_tests"])  

  to_remove_3 = []

  for student in students:
      if len(student.tests) -1 < test_min:
          print(student.fname, student.lname, len(student.tests))
          to_remove_3.append(student)
          
  for student in to_remove_3:
      students.remove(student)   
      
  if parameters["exclude_without_baseline "] == 'true':
    include_no_baseline = "n"
  else:
    include_no_baseline = "y"  

  for student in students:
      student.update_baseline()

  if include_no_baseline == "n":
      to_remove_4 = []
      count = 0
      
      for student in students:
          if student.has_baseline is False:
              count+=1
              print("REMOVED",student.fname, student.has_baseline)
              to_remove_4.append(student)
              
          #else:
            #print("KEPT", student.fname, student.tutoring_hours)    
      #print("removed " + str(count))     
      for student in to_remove_4:
          students.remove(student) 
          
  if(parameters["exclude_incomplete "]== 'true'):
      exclude_incomplete = "y"
  else:
      exclude_incomplete = "n"


  if exclude_incomplete == "y":

      to_remove_5 = []
      count = 0
      
      for student in students:
          if student.completion is False:
              count+=1
              #print("REMOVED",student.fname, student.has_baseline)
              to_remove_5.append(student)
              
          #else:
            #print("KEPT", student.fname, student.tutoring_hours)    
      #print("removed " + str(count))     
      for student in to_remove_5:
          print("REMOVED",student.fname)
          students.remove(student) 
        
        
title = parameters["name"] 

load_student_data()
slice_data()

#print("REMAINING")        
#for student in students:
    #print(student.fname)        
        
#print_all_students()  

#print(students[2])
#students[-13].order_tests()    
#print(students[-13])
#print("max math", students[-13].max_score_verbal)
#print("math verbal", students[-13].max_score_math)
# \print(students[-1])  

#print_students_without_baselines()

#SEPARATE OUR STUDENTS#
SAT_only_students = []
ACT_only_students = []
both_tests_students = []
for student in students:
    if student.all_SAT(): #and student.growth() != "Only One Test": 
        SAT_only_students.append(student) 
    elif student.all_ACT():
        ACT_only_students.append(student) 
    else:
        both_tests_students.append(student)

  # print("SAT ONLY")
  # for student in SAT_only_students:
  #     print(student.lname)
  #     
  # print("\nACT ONLY")
  # for student in ACT_only_students:
  #     print(student.lname)
  #     
  # print("\nBoth")
  # for student in both_tests_students:
  #     print(student.lname)
    
def export():    
    data = Data()
  

    try:
        with open(saveReportPath) as csvfile:
            pass
    except:
        with open(saveReportPath,'w') as csvfile:    
            writer = csv.writer(csvfile, delimiter=',')
            writer.writerow(["","","","","","","","","","",'Improvement by test (any test)',"","","","","","","",'Improvement if SATs only',"","","","","","","",'Improvement if ACTs only',"","","","","","","",'Improvement if SAT & ACT',"","","","","","","","Imp. by hours","","","","","","","","","","","","","Started w/Higher Verbal","","","","","Started w/Higher Math","","","","","Started w/Higher Verbal (by at least 50)","","","","","Started w/Higher Math (by at least 50)","","","","","Started w/Higher Verbal (started and ended by at least 50)","","","","","Started w/Higher Math (started and ended by at least 50)","","","","","Percent of students who got x total improvement", "","","","", "Percent of students who got x improvement in any section", "","","Percent of sections with x improvement"])
            writer.writerow(['Title','Students','SAT/ACT Hours','Average Hours/Student','Average Baseline','Average Improvement','Average Verbal Improvement', 'Average Math Improvement','V+M',"", '1 test','2 tests','3 tests','4 tests','5 tests','6 tests','Total',"",'1 test','2 tests','3 tests','4 tests','5 tests','6 tests','Total','','1 test','2 tests','3 tests','4 tests','5 tests','6 tests','Total', '',"1 test", '2 tests','3 tests','4 tests','5 tests','6 tests','Total','','1-19','20-39','40-59','60+','','1-10','11-19','20-29',"30-39","40-49",'50-59','60+','','% Best of V','% Best on M','% better ACT','% better SAT','','% Best of V','% Best on M','% better ACT','% better SAT',"",'% Best of V','% Best on M','% better ACT','% better SAT','','% Best of V','% Best on M','% better ACT','% better SAT',"",'% Best of V','% Best on M','% better ACT','% better SAT','','% Best of V','% Best on M','% better ACT','% better SAT','','100plus','200plus','300plus','400plus',"-","100plus","200plus", "-","100plus","200plus"])
        
            

    with open(saveReportPath, 'a+') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        row_array = []
        row_array.append(title)
        row_array.extend([data.numstudents, data.totalhours, data.av_hours_per_student, data.av_baseline])
        row_array.extend([av_growth_all_students(students)])
        row_array.extend([data.av_section_improvement[0], data.av_section_improvement[1], data.av_section_improvement[2]])
        row_array.extend(["-"])
        row_array.extend([data.improvement_all[0], data.improvement_all[1], data.improvement_all[2], data.improvement_all[3], data.improvement_all[4], data.improvement_all[5], data.improvement_all[6]])
        row_array.extend(["-"])
        row_array.extend([data.improvement_if_SAT_only[0], data.improvement_if_SAT_only[1], data.improvement_if_SAT_only[2], data.improvement_if_SAT_only[3], data.improvement_if_SAT_only[4], data.improvement_if_SAT_only[5], data.improvement_if_SAT_only[6]])
        row_array.extend(["-"])
        row_array.extend([data.improvement_if_ACT_only[0], data.improvement_if_ACT_only[1], data.improvement_if_ACT_only[2], data.improvement_if_ACT_only[3], data.improvement_if_ACT_only[4], data.improvement_if_ACT_only[5], data.improvement_if_ACT_only[6]])
        row_array.extend(["-","n/a",data.improvement_if_both[1],data.improvement_if_both[2],data.improvement_if_both[3],data.improvement_if_both[4],data.improvement_if_both[5],data.improvement_if_both[6]])
        row_array.extend(["-", data.improvement_by_hours[0], data.improvement_by_hours[1],data.improvement_by_hours[2],data.improvement_by_hours[3], data.improvement_by_hours[4], data.improvement_by_hours[5],data.improvement_by_hours[6],data.improvement_by_hours[7], data.improvement_by_hours[8], data.improvement_by_hours[9],data.improvement_by_hours[10],data.improvement_by_hours[11]])
        row_array.extend(["-", data.higher_verbal_analysis[0], data.higher_verbal_analysis[1], data.higher_verbal_analysis[2], data.higher_verbal_analysis[3]])
        row_array.extend(["-", data.higher_math_analysis[0], data.higher_math_analysis[1], data.higher_math_analysis[2], data.higher_math_analysis[3]])
        
        row_array.extend(["-", data.higher_verbal_analysis[4], data.higher_verbal_analysis[5], data.higher_verbal_analysis[6], data.higher_verbal_analysis[7]])
        row_array.extend(["-", data.higher_math_analysis[4], data.higher_math_analysis[5], data.higher_math_analysis[6], data.higher_math_analysis[7]])
        
        row_array.extend(["-", data.higher_verbal_analysis[8], data.higher_verbal_analysis[9], data.higher_verbal_analysis[10], data.higher_verbal_analysis[11]])
        row_array.extend(["-", data.higher_math_analysis[8], data.higher_math_analysis[9], data.higher_math_analysis[10], data.higher_math_analysis[11]])
        
        
        row_array.extend(["-", data.percent_improvement[0], data.percent_improvement[1], data.percent_improvement[2], data.percent_improvement[3]])
        row_array.extend(["-", data.student_section_improvement[0], data.student_section_improvement[1]])
        row_array.extend(["-", data.section_improvement[0], data.section_improvement[1]])
        writer.writerow(row_array)
        
        row_array2 = []
        x = 0
        for i in range(10):
            row_array2.append("")
            x+=1

        for count in student_counts:
            x+=1
            if x == 47:
                row_array2.append("-")
            if x == 54:
                pass
            else: 
                row_array2.append(count)
        
        writer.writerow(row_array2)
        
        row_array3 = []
        x = 0
        for i in range(10):
            row_array3.append("")
            x+=1
        for count in hours_counts:
            x+=1
            if x == 47:
                row_array3.append("-")
            if x == 54:
                pass
            else: 
                row_array3.append(count)
        
        writer.writerow(row_array3)
        


# Uncomment below to run 

# runAnalysis()
print("")
export()
print("")
print("DONE...Report can be found in report.csv")
print("xoxo Dennis")

# print student slice to a file
print(students)
with open(saveDir + '/slice.txt','w') as student_file:
    student_file.write(parameters["name"])
    for student in students:
      student_file.write(str(student))