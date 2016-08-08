package org.finra.createathon.hellohive.model;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * User: Han Li
 * Date: 8/8/16
 */
public class QueryWrapper
{
    public static Map<String, QueryWrapper> queryStatus = new ConcurrentHashMap<>();

    public String getQueryId()
    {
        return this.queryId;
    }

    public QueryWrapper withQueryId(String queryId)
    {
        this.queryId = queryId;
        return this;
    }

    public String getSql()
    {
        return this.sql;
    }

    public QueryWrapper withSql(String sql)
    {
        this.sql = sql;
        return this;
    }

    public QueryWrapper.status getStatus()
    {
        return this.status;
    }

    public QueryWrapper withStatus(QueryWrapper.status status)
    {
        this.status = status;
        return this;
    }

    public QueryWrapper.queryType getQueryType()
    {
        return this.queryType;
    }

    public QueryWrapper withQueryType(QueryWrapper.queryType queryType)
    {
        this.queryType = queryType;
        return this;
    }

    public String getNotifyEmail()
    {
        return this.notifyEmail;
    }

    public QueryWrapper withNotifyEmail(String notifyEmail)
    {
        this.notifyEmail = notifyEmail;
        return this;
    }

    public String getNotifyUrl()
    {
        return this.notifyUrl;
    }

    public QueryWrapper withNotifyUrl(String notifyUrl)
    {
        this.notifyUrl = notifyUrl;
        return this;
    }

    public enum status{
        PENDING, SUCCESS, ERROR
    }
    public enum queryType{
        SYNC, ASYNC
    }
    private String queryId;
    private String sql;
    private status status;
    private queryType queryType;
    private String notifyEmail;
    private String notifyUrl;
    private String user;

}
