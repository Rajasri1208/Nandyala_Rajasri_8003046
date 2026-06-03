import java.net.*;
import java.io.*;

public class Server {
    public static void main(String[] args) {
        try {
            ServerSocket server = new ServerSocket(5000);

            System.out.println("Waiting for client...");

            Socket socket = server.accept();

            BufferedReader in = new BufferedReader(
                new InputStreamReader(socket.getInputStream()));

            System.out.println("Client: " + in.readLine());

            server.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}