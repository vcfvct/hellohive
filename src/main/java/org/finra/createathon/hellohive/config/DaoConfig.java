package org.finra.createathon.hellohive.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * User: Han Li
 * Date: 7/18/16
 */
@Configuration
public class DaoConfig
{
    @Autowired
    @Qualifier("hiveDataSource")
    DataSource hiveDs;

    @Bean(name = "hiveJdbcTemplate")
    public JdbcTemplate hiveJdbcTemplate()
    {
        return new JdbcTemplate(hiveDs);
    }
}
