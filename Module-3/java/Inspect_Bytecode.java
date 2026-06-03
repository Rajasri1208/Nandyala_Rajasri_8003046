public class Inspect_Bytecode {

    public void show() {
        int a = 10;
        int b = 20;
        int c = a + b;

        System.out.println(c);
    }

    public static void main(String[] args) {
        new Inspect_Bytecode().show();
    }
}
