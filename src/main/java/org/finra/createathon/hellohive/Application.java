package org.finra.createathon.hellohive;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * User: Han Li
 * Date: 7/18/16
 */
@SpringBootApplication
@EnableAsync
public class Application
{
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
