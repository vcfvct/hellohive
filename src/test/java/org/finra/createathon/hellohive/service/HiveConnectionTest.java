package org.finra.createathon.hellohive.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;

import org.finra.createathon.hellohive.Application;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.core.env.Environment;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * User: Han Li
 * Date: 7/18/16
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
public class HiveConnectionTest
{
    @Autowired
    private Environment env;

    @Test
    public void testRawJdbcSql() throws SQLException
    {
        /* String hiveSql =
            "select * from mrp.rcoc_rec_dtl_prc_bz where begindate='2016-01-01' AND PRCSG_DT_PRMRY_MP_ID='JPMS' AND OATS_PRCSG_DT='2016-01-20'"*/

        //        String hiveSql =
        //            "explain select * from mrp.QMRC011_SPRVN_DTL_PRC_TXT where begindate='2015-12-01'limit 10";

        String hiveSql = "desc mrp.QMRC011_SPRVN_DTL_PRC_TXT";

        verifyDrivers();
        Instant start = Instant.now();

        String dbUrl = env.getProperty("db.url");
        String user = env.getProperty("db.username");
        String pw = new String(Base64.getDecoder().decode(env.getProperty("db.password.md5")));

        try (Connection hiveCon = DriverManager.getConnection(dbUrl, user, pw);
             Statement hiveStmt = hiveCon.createStatement();
             ResultSet hiveRes = hiveStmt.executeQuery(hiveSql))
        {
            final ResultSetMetaData rsmd = hiveRes.getMetaData();
            final int columnCount = rsmd.getColumnCount();
            // write header
            for (int i = 1; i <= columnCount; i++)
            {
                System.out.println(rsmd.getColumnLabel(i));
            }
            while (hiveRes.next())
            {
                String name = hiveRes.getString(1).toUpperCase();
                //System.out.println(name);
                System.out.println(name + "\t" + hiveRes.getString(2));
            }
        } catch (Exception e)
        {
            System.out.println(e.getMessage());
        } finally
        {
            Instant end = Instant.now();
            System.out.println("Execution took: " + Duration.between(start, end));
        }
    }

    private void verifyDrivers()
    {
        String driverName = env.getProperty("db.driver");
        try
        {
            Class.forName(driverName);
        } catch (ClassNotFoundException e)
        {
            e.printStackTrace();
            System.exit(1);
        }
    }

}
