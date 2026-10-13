#include <stdio.h>

#define DAYS_IN_WEEK 7.0
#define HOURS_PER_DAY 24.0
#define MAX_DAILY_STUDY_HOURS 8.0

void inputAttendanceData(int *totalClasses, int *attendedClasses, int *requirementPercentage)
{
    printf("Enter the total number of classes: ");
    scanf("%d", totalClasses);
    printf("\n Enter the number of classes attended: ");
    scanf("%d", attendedClasses);
    printf("\n Enter the attendance requirement percentage: ");
    scanf("%d", requirementPercentage);
}

void attendanceReport(int totalClasses, int attendedClasses, int requirementPercentage)
{
    int canMissClasses = (totalClasses * requirementPercentage / 100) - attendedClasses;
    if (canMissClasses < 0)
    {
        printf("\n You have already missed more classes and you are currently at %.2f percentage of attendance.\n", (double)attendedClasses * 100 / totalClasses);
    }
    else if (canMissClasses == 0)
    {
        printf("\n You cannot miss any more classes");
    }
    else
    {
        printf("\n You can miss %d classes and still meet the attendance requirement.\n", canMissClasses);
    }
}

void errorsInAttendanceData(int totalClasses, int attendedClasses, int requirementPercentage)
{
    if (attendedClasses > totalClasses)
    {
        printf("\n The number of classes attended cannot be greater than the total number of classes.\n");
        return;
    }
    if (requirementPercentage < 0 || requirementPercentage > 100)
    {
        printf("\n The attendance requirement percentage must be between 0 and 100.\n");
        return;
    }
    if (totalClasses == 0)
    {
        printf("\n The total number of classes cannot be zero.\n");
        return;
    }
}

void planAttendance(void)
{
    int totalClasses, attendedClasses, requirementPercentage, canMissClasses;

    inputAttendanceData(&totalClasses, &attendedClasses, &requirementPercentage);

    errorsInAttendanceData(totalClasses, attendedClasses, requirementPercentage);

    attendanceReport(totalClasses, attendedClasses, requirementPercentage);
}

void inputAcademicData(double *obtainedMarks, double *maxMarks, double *targetMarks, double *currentdailyStudyHours, double *remainingDays)
{
    printf("Enter the obtained marks: ");
    scanf("%lf", obtainedMarks);
    printf("Enter the maximum marks: ");
    scanf("%lf", maxMarks);
    printf("Enter the target marks: ");
    scanf("%lf", targetMarks);
    printf("Enter the current daily study hours: ");
    scanf("%lf", currentdailyStudyHours);
    printf("Enter the remaining days: ");
    scanf("%lf", remainingDays);
}

void printAccademicReport(double obtainedMarks, double maxMarks, double targetMarks, double currentdailyStudyHours, double remainingDays)
{
    double marksGap = targetMarks - obtainedMarks;

    printf("\n========== ACADEMIC PLANNER REPORT ==========\n");
    printf("Current marks       : %.2f / %.2f\n", obtainedMarks, maxMarks);
    printf("Current percentage  : %.2f%%\n", obtainedMarks / maxMarks * 100);
    printf("Target marks        : %.2f / %.2f\n", targetMarks, maxMarks);
    printf("Target percentage   : %.2f%%\n", targetMarks / maxMarks * 100);
    printf("Marks gap           : %.2f\n", targetMarks - obtainedMarks);
    printf("Days remaining      : %.0f\n", remainingDays);
    printf("Current study pace  : %.2f hours/day\n", currentdailyStudyHours);
    printf("Available study time: %.2f hours\n", currentdailyStudyHours * remainingDays);

    if (marksGap <= 0.0)
    {
        printf("\nSTATUS: Your target marks have already been reached.\n");
        printf("Keep revising to maintain your performance.\n");
    }
    else if (remainingDays == 0.0)
    {
        printf("\nSTATUS: No study days remain before the exam.\n");
        printf("A new study schedule cannot be allocated for this period.\n");
    }
    else if ((currentdailyStudyHours * remainingDays) == 0.0)
    {
        printf("\nSTATUS: No study time is currently allocated.\n");
        printf("Set a realistic study schedule to begin planning.\n");
    }
    else
    {
        printf("\n========== SUGGESTED SCHEDULE ==========\n");
        printf("Weekly study target     : %.2f hours\n", (currentdailyStudyHours * remainingDays)/ (remainingDays / DAYS_IN_WEEK));

        if (currentdailyStudyHours > MAX_DAILY_STUDY_HOURS)
        {
            printf("INTENSITY: daily workload is very high.\n");
            printf("Consider revising the schedule to make it sustainable.\n");
        }
        else if (currentdailyStudyHours >= 3.0)
        {
            printf("INTENSITY: High. Use focused sessions and regular breaks.\n");
        }
        else if (currentdailyStudyHours >= 1.0)
        {
            printf("INTENSITY: Moderate. Follow the schedule consistently.\n");
        }
        else
        {
            printf("INTENSITY: Light. Try to increase the study time gradually.\n");
        }

        printf("\nSuggested allocation of daily study time:\n");
        printf("- Concept review (40%%): %.2f hours\n", currentdailyStudyHours * 0.40);
        printf("- Practice questions (40%%): %.2f hours\n", currentdailyStudyHours * 0.40);
        printf("- Revision and timed practice (20%%): %.2f hours\n", currentdailyStudyHours * 0.20);
        printf("\nReview progress regularly and adjust the plan if needed.\n");
    }
}

void printAccademicCaution(void)
{
    printf("\nNOTE: This report estimates available study time, not future marks.\n");
    printf("Marks depend on prior knowledge, study quality, exam difficulty, and other factors.\n");
    printf("============================================\n");
}
void accademicMentor(void)
{
    printf("You have selected Academic Mentor\n");
    double obtainedMarks, maxMarks, targetMarks, currentdailyStudyHours, remainingDays;

    inputAcademicData(&obtainedMarks, &maxMarks, &targetMarks, &currentdailyStudyHours, &remainingDays);

    printAccademicReport(obtainedMarks, maxMarks, targetMarks, currentdailyStudyHours, remainingDays);

    printAccademicCaution();
}

int main()
{
    int option;
    printf("Select the option you want to continue with \n 1. Attendance Planner \n 2. Academic Mentor\n");
    scanf("%d", &option);
    switch (option)
    {
    case 1:
        planAttendance();
        break;
    case 2:
        accademicMentor();
        break;
    default:
        printf("Invalid option selected");
    }
    return 0;
}