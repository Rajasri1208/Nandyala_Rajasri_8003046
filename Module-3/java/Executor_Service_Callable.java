import java.util.concurrent.*;

public class Executor_Service_Callable {

    public static void main(String[] args)
            throws Exception {

        ExecutorService service =
                Executors.newFixedThreadPool(3);

        Callable<Integer> task =
                () -> 100;

        Future<Integer> future =
                service.submit(task);

        System.out.println(
                future.get());

        service.shutdown();
    }
}