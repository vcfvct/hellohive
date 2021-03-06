package org.finra.createathon.hellohive.service.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;

import org.finra.createathon.hellohive.common.Const;
import org.finra.createathon.hellohive.common.MailSender;
import org.finra.createathon.hellohive.model.QueryWrapper;
import org.finra.createathon.hellohive.service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

/**
 * User: Han Li
 * Date: 7/18/16
 */
@Service
public class QueryServiceImpl implements QueryService
{
    @Autowired
    @Qualifier("hiveJdbcTemplate")
    JdbcTemplate hiveJdbcTemplate;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public int handleHql(String hql, PrintWriter writer)
    {
        return hiveJdbcTemplate.query(hql, rs -> {
            int rowCount = 0;
            final ResultSetMetaData rsmd = rs.getMetaData();
            final int columnCount = rsmd.getColumnCount();
            // write header
            for (int i = 1; i <= columnCount; i++)
            {
                writer.append(Const.DOUBLE_QUOTE);
                writer.append(rsmd.getColumnLabel(i).toUpperCase());
                writer.append(Const.DOUBLE_QUOTE);
                // for all but the last column add comma:
                if (i != columnCount)
                {
                    writer.append(Const.COMMA);
                }
            }
            writer.println();

            rs.setFetchSize(5000);
            // write contents:
            while (rs.next())
            {
                rowCount++;
                for (int j = 1; j <= columnCount; j++)
                {
                    writer.append(Const.DOUBLE_QUOTE);
                    if (null != rs.getString(j))
                    {
                        writer.append(rs.getString(j));
                    }
                    writer.append(Const.DOUBLE_QUOTE);
                    // for all but the last column add comma:
                    if (j < columnCount)
                    {
                        writer.append(Const.COMMA);
                    }
                }
                writer.println();
            }

            writer.flush();
            writer.close();
            return rowCount;
        });
    }

    @Override
    public List<String> allTables()
    {
        String sql = "show tables in mrp";
        return hiveJdbcTemplate.query(sql, rs -> {
            List<String> columns = new ArrayList<>();
            while (rs.next())
            {
                String col = rs.getString(1);
                columns.add(col);
            }
            return columns;
        });
    }

    @Override
    public Map<String, String> fetchColumnsByTable(String tableName)
    {
        String sql = "desc mrp." + tableName;

        return hiveJdbcTemplate.query(sql, rs -> {
            Map<String, String> columns = new HashMap<>();
            while (rs.next())
            {
                String colName = rs.getString(1);
                String colType = rs.getString(2);
                if (StringUtils.isEmpty(colName))
                {
                    break;
                }
                else
                {
                    columns.put(colName, colType);
                }
            }
            return columns;
        });
    }

    @Async
    @Override
    public void asyncQueryHandler(QueryWrapper queryWrapper)
    {
        //1.execute
        File file = new File("/tmp/" + queryWrapper.getQueryId());
        String senderEmail = "han.li@finra.org";
        try
        {
            PrintWriter printWriter = new PrintWriter(file);
            handleHql(queryWrapper.getSql(), printWriter);
            queryWrapper.withStatus(QueryWrapper.status.SUCCESS);
            String emailSubject = "Hive query File ready";
            String emailBody = "File is ready:" + queryWrapper.getQueryId();
            if (!StringUtils.isEmpty(queryWrapper.getNotifyEmail()))
            {
                MailSender mailSender = new MailSender();
                mailSender.sendEmail(senderEmail, queryWrapper.getNotifyEmail(), emailSubject, emailBody);
            }
            if(!StringUtils.isEmpty(queryWrapper.getNotifyUrl()))
            {
                restTemplate.getForEntity(queryWrapper.getNotifyUrl(), String.class);
            }
        } catch (FileNotFoundException | MessagingException e)
        {
            e.printStackTrace();
        }
    }
}
