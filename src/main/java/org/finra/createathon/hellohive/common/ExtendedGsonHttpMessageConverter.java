package org.finra.createathon.hellohive.common;

import org.springframework.http.converter.json.GsonHttpMessageConverter;

import com.google.gson.GsonBuilder;

/**
 * User: Han Li
 * Date: 7/18/16
 */
public class ExtendedGsonHttpMessageConverter extends GsonHttpMessageConverter
{
    public ExtendedGsonHttpMessageConverter()
    {
        super();
        setGson(new GsonBuilder()
            //                .registerTypeAdapter(Date.class, new GsonDate.Serializer())
            //                .registerTypeAdapter(Date.class, new GsonDate.Deserializer())
            //           .registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY)
            //.setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
            //.disableHtmlEscaping()
            .create());
    }
}
