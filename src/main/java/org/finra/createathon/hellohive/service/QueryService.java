package org.finra.createathon.hellohive.service;

import java.io.PrintWriter;
import java.util.List;

/**
 * User: Han Li
 * Date: 7/18/16
 */
public interface QueryService
{
    int handleHql(String hql, PrintWriter writer);

    List<String> allTables();

    List<String> fetchColumnsByTable(String tableName);
}
