package org.finra.createathon.hellohive.service;

import java.io.PrintWriter;

/**
 * User: Han Li
 * Date: 7/18/16
 */
public interface QueryService
{
    int handleHql(String hql, PrintWriter writer);
}
