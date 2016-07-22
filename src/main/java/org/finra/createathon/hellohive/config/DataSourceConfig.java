package org.finra.createathon.hellohive.config;

import java.io.IOException;
import java.util.Base64;

import javax.sql.DataSource;

import org.apache.hive.jdbc.HiveDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

/**
 * User: Han Li
 * Date: 7/18/16
 */
@Configuration
public class DataSourceConfig
{
    @Autowired
    private Environment env;

    @Autowired
    private ResourceLoader resourceLoader;

    @Bean(name = "hiveDataSource")
    public DataSource hiveDataSource() throws IOException
    {
        //the ssltruststore does not accept classpath but only absolute path.
        String trustStoreAbsolutePath = resourceLoader.getResource("classpath:finraTrustStore").getURI().getPath();
        String dbUrl = env.getProperty("db.url") + ";ssltruststore=" + trustStoreAbsolutePath + ";trustStorePassword=changeit";
        String user = env.getProperty("db.username");
        String pw = new String(Base64.getDecoder().decode(env.getProperty("db.password.md5")));

        java.sql.Driver driver = new HiveDriver();
        return new SimpleDriverDataSource(driver, dbUrl, user, pw);
    }
}
