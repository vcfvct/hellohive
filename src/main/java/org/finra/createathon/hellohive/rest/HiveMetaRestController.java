package org.finra.createathon.hellohive.rest;

import java.util.List;
import java.util.Map;

import org.finra.createathon.hellohive.service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * User: Han Li
 * Date: 8/6/16
 */
@RestController
@RequestMapping("/rest/hivemeta")
public class HiveMetaRestController
{
    @Autowired
    private QueryService queryService;

    @RequestMapping(value = "/tables", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> getAllTables()
    {
        return queryService.allTables();
    }

    @RequestMapping(value = "/table/{tableName}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> getColumnNamesByTable(@PathVariable("tableName") String tableName)
    {
        return queryService.fetchColumnsByTable(tableName);
    }


}
