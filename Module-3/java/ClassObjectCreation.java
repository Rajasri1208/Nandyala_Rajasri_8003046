class Car {
    String make;
    String model;
    int year;

    void displayDetails() {
        System.out.println(make + " " + model + " " + year);
    }
}

public class ClassObjectCreation
 {
    public static void main(String[] args) {

        Car c1 = new Car();
        c1.make = "Toyota";
        c1.model = "Camry";
        c1.year = 2020;

        Car c2 = new Car();
        c2.make = "Honda";
        c2.model = "City";
        c2.year = 2022;

        c1.displayDetails();
        c2.displayDetails();
    }
}
