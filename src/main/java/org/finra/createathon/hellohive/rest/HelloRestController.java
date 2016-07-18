package org.finra.createathon.hellohive.rest;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.finra.createathon.hellohive.service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * User: Han Li
 * Date: 7/18/16
 */
@RestController
@RequestMapping(value = "/rest")
public class HelloRestController
{
    @Autowired
    QueryService hiveDao;

    @RequestMapping(value = "/test", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> index() {
        return Collections.singletonMap("key","Greetings from Spring Boot!....");
    }

    @RequestMapping(value = "/hql", method = RequestMethod.POST)
    public void testFileTransfer(@RequestBody String hql, HttpServletResponse response) throws IOException
    {
        String finalFileName = "query-result.csv";
        response.setContentType("text/csv");
        response.setHeader("Content-disposition", "attachment; filename=" + finalFileName);

        hiveDao.handleHql(hql, response.getWriter());
    }

}
