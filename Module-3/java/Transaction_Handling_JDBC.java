import java.sql.*;

public class Transaction_Handling_JDBC {

    static String url =
            "jdbc:mysql://localhost:3306/testdb";

    static String user = "root";

    static String password =
            "1234";

    public static void main(String[] args) {

        Connection con = null;

        try {

            con =
                DriverManager.getConnection(
                    url,
                    user,
                    password);

            con.setAutoCommit(false);

            PreparedStatement debit =
                con.prepareStatement(
                    "UPDATE accounts SET balance = balance - ? WHERE id = ?");

            debit.setDouble(1, 200);
            debit.setInt(2, 1);

            debit.executeUpdate();

            PreparedStatement credit =
                con.prepareStatement(
                    "UPDATE accounts SET balance = balance + ? WHERE id = ?");

            credit.setDouble(1, 200);
            credit.setInt(2, 2);

            credit.executeUpdate();

            con.commit();

            System.out.println(
                "Transfer Successful");

        } catch (Exception e) {

            try {

                if(con != null) {

                    con.rollback();

                    System.out.println(
                        "Transaction Rolled Back");
                }

            } catch(Exception ex) {

                ex.printStackTrace();
            }

            e.printStackTrace();
        }
    }
}
