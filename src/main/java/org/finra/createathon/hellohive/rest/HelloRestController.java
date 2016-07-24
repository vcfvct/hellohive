package org.finra.createathon.hellohive.rest;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.text.StrSubstitutor;
import org.finra.createathon.hellohive.service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
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
    QueryService queryService;

    public static Map<String, String> fakeHqlStore = new ConcurrentHashMap<>();

    @RequestMapping(value = "/test", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> test()
    {
        return Collections.singletonMap("key", "Greetings from Spring Boot!....");
    }

    @RequestMapping(value = "/hql", method = RequestMethod.POST)
    public void testFileTransfer(@RequestBody String hql, HttpServletResponse response) throws IOException
    {
        executeHql(hql, response);
    }

    private void executeHql(String hql, HttpServletResponse response) throws IOException
    {
        String finalFileName = "query-result.csv";
        response.setContentType("text/csv");
        response.setHeader("Content-disposition", "attachment; filename=" + finalFileName);

        queryService.handleHql(hql, response.getWriter());
    }

    @RequestMapping(value = "/hql/register/name/{name}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> registerHql(@RequestBody String hql, @PathVariable("name") String name)
    {
        fakeHqlStore.put(name, hql);
        return Collections.singletonMap(name, hql);
    }

    @RequestMapping(value = "/hql/run/name/{name}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> runHql(@RequestBody Map<String, String> params, @PathVariable("name") String name, HttpServletResponse response)
        throws IOException
    {
        String responseKey = "msg";
        String hqlTemplate = fakeHqlStore.get(name);
        if (hqlTemplate != null)
        {
            String hql = new StrSubstitutor(params).replace(hqlTemplate);
            executeHql(hql, response);
            return null;
        }
        else
        {
            return Collections.singletonMap(responseKey, "HQL not found for: " + name);
        }
    }

    @RequestMapping(value = "/hql/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> getAllHqls()
    {
        return fakeHqlStore;
    }

    @PostConstruct
    public void setFakeHqlStore() throws IOException
    {
        Resource r = new ClassPathResource("fakeHqls.xml");
        Properties p = new Properties();
        p.loadFromXML(new FileInputStream(r.getFile()));
        p.entrySet().stream().forEach(entry -> fakeHqlStore.put((String)entry.getKey(), (String)entry.getValue()));
    }
}
