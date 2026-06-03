import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JDBCExample {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/testdb";
        String user = "root";
        String password = "1234";

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection con =
                    DriverManager.getConnection(
                            url,
                            user,
                            password);

            Statement stmt =
                    con.createStatement();

            ResultSet rs =
                    stmt.executeQuery(
                            "SELECT * FROM students");

            System.out.println("Student Records");

            while (rs.next()) {

                System.out.println(
                        rs.getInt("id")
                        + " "
                        + rs.getString("name"));
            }

            con.close();

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}