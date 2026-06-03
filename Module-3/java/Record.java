import java.util.*;
import java.util.stream.*;

record Person(String name, int age) {}

public class Record {
    public static void main(String[] args) {

        List<Person> people = List.of(
                new Person("Asha", 20),
                new Person("Ravi", 17),
                new Person("John", 25)
        );

        System.out.println("All Persons:");
        people.forEach(System.out::println);

        System.out.println("Age >= 18:");
        people.stream()
                .filter(p -> p.age() >= 18)
                .forEach(System.out::println);
    }
}
