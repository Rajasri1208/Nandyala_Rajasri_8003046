import java.sql.*;

public class JDBCInsertUpdate {

    static String url =
            "jdbc:mysql://localhost:3306/testdb";

    static String user = "root";

    static String password = "1234";

    public static void insertStudent(
            int id,
            String name)
            throws Exception {

        Connection con =
                DriverManager.getConnection(
                        url,
                        user,
                        password);

        String query =
                "INSERT INTO students VALUES (?, ?)";

        PreparedStatement ps =
                con.prepareStatement(query);

        ps.setInt(1, id);
        ps.setString(2, name);

        int rows = ps.executeUpdate();

        System.out.println(
                rows + " record inserted");

        con.close();
    }

    public static void updateStudent(
            int id,
            String name)
            throws Exception {

        Connection con =
                DriverManager.getConnection(
                        url,
                        user,
                        password);

        String query =
                "UPDATE students SET name=? WHERE id=?";

        PreparedStatement ps =
                con.prepareStatement(query);

        ps.setString(1, name);
        ps.setInt(2, id);

        int rows = ps.executeUpdate();

        System.out.println(
                rows + " record updated");

        con.close();
    }

    public static void main(String[] args)
            throws Exception {

        insertStudent(4, "Kiran");

        updateStudent(1, "Raj");
    }
}
