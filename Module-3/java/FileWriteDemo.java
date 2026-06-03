import java.io.FileWriter;
import java.util.Scanner;

public class FileWriteDemo {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        try {
            System.out.print("Enter text to write: ");
            String data = sc.nextLine();

            FileWriter fw = new FileWriter("output.txt");
            fw.write(data);
            fw.close();

            System.out.println("Data written to file successfully");

        } catch (Exception e) {
            System.out.println("Error writing file");
        }

        sc.close();
    }
}