public class Virtual_Thread {

    public static void main(String[] args) {

        for (int i = 1; i <= 10; i++) {
            int num = i;

            Thread.startVirtualThread(() -> {
                System.out.println("Virtual Thread " + num);
            });
        }

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}