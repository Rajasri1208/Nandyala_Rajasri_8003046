public class TypeCasting{
    public static void main(String[] args) {

        // Double to int (explicit casting)
        double d = 45.67;
        int i = (int) d;

        System.out.println("Original double value: " + d);
        System.out.println("After casting to int: " + i);

        // Int to double (implicit casting)
        int num = 25;
        double converted = num;

        System.out.println("Original int value: " + num);
        System.out.println("After casting to double: " + converted);
    }
}
