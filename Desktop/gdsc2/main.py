students = {}


def add_student():
    name = input("Enter student name: ")
    age = int(input("Enter student age: "))
    grade = input("Enter student grade: ")
    # Add any other relevant details here
    students[name] = {"age": age, "grade": grade}


def view_student():
    name = input("Enter student name: ")
    if name in students:
        print("Student Details:")
        print(f"Name: {name}")
        print(f"Age: {students[name]['age']}")
        print(f"Grade: {students[name]['grade']}")
        # Print any other relevant details here
    else:
        print("Student not found.")


def list_all_students():
    print("All Students:")
    for name, details in students.items():
        print(f"Name: {name}")
        print(f"Age: {details['age']}")
        print(f"Grade: {details['grade']}")
        # Print any other relevant details here


def update_student_information():
    name = input("Enter student name: ")
    if name in students:
        print("Current Student Details:")
        print(f"Name: {name}")
        print(f"Age: {students[name]['age']}")
        print(f"Grade: {students[name]['grade']}")
        # Print any other relevant details here

        age = int(input("Enter new age (press enter to skip): "))
        if age != "":
            students[name]["age"] = age

        grade = input("Enter new grade (press enter to skip): ")
        if grade != "":
            students[name]["grade"] = grade

        print("Student information updated.")
    else:
        print("Student not found.")


def delete_student():
    name = input("Enter student name: ")
    if name in students:
        del students[name]
        print("Student deleted.")
    else:
        print("Student not found.")


# Main program loop
while True:
    print("\nStudent Database Program")
    print("1. Add Student")
    print("2. View Student")
    print("3. List All Students")
    print("4. Update Student Information")
    print("5. Delete Student")
    print("6. Exit")

    choice = input("Enter your choice (1-6): ")

    if choice == "1":
        add_student()
    elif choice == "2":
        view_student()
    elif choice == "3":
        list_all_students()
    elif choice == "4":
        update_student_information()
    elif choice == "5":
        delete_student()
    elif choice == "6":
        break
    else:
        print("Invalid choice. Please try again.")
