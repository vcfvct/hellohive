package org.finra.createathon.hellohive.config;

import java.util.Collections;
import java.util.List;

import org.finra.createathon.hellohive.common.ExtendedGsonHttpMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.xml.Jaxb2RootElementHttpMessageConverter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * User: Han Li
 * Date: 7/18/16
 */
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter
{
    //more can be added from addDefaultHttpMessageConverters() in WebMvcConfigurationSupport
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters)
    {
        //ByteArray handler
        converters.add(new ByteArrayHttpMessageConverter());
        //String handler
        StringHttpMessageConverter stringConverter = new StringHttpMessageConverter();
        stringConverter.setWriteAcceptCharset(false);
        stringConverter.setSupportedMediaTypes(Collections.singletonList(MediaType.TEXT_PLAIN));
        converters.add(stringConverter);
        //Gson for json
        converters.add(new ExtendedGsonHttpMessageConverter());
        //Jaxb for xml
        converters.add(new Jaxb2RootElementHttpMessageConverter());
    }

    @Bean
    public RestTemplate generalRestTemplate()
    {
        return new RestTemplate();
    }
}
