package org.finra.createathon.hellohive.rest;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * User: Han Li
 * Date: 7/24/16
 */
@Controller
public class UiController
{
    @Value("${application.message:Hello World}")
    private String message;

    @RequestMapping("/index")
    public String welcome(Map<String, Object> model) {
        model.put("time", new Date());
        model.put("message", this.message);
        return "welcome";
    }
}
