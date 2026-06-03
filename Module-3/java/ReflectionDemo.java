import java.lang.reflect.Method;

class Student {

    public void display() {
        System.out.println("Student Method");
    }
}

public class ReflectionDemo {

    public static void main(String[] args)
            throws Exception {

        Class<?> cls =
                Class.forName("Student");

        Object obj =
                cls.getDeclaredConstructor()
                        .newInstance();

        Method[] methods =
                cls.getDeclaredMethods();

        for (Method m : methods) {

            System.out.println(
                    "Method: " + m.getName());

            m.invoke(obj);
        }
    }
}