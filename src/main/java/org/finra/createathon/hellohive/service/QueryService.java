package org.finra.createathon.hellohive.service;

import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

/**
 * User: Han Li
 * Date: 7/18/16
 */
public interface QueryService
{
    int handleHql(String hql, PrintWriter writer);

    List<String> allTables();

    Map<String, String> fetchColumnsByTable(String tableName);
}
